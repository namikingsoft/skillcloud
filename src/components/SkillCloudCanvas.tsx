import SkillCloud from 'domains/SkillCloud'
import SkillNode from 'domains/SkillNode'
import Skill from 'domains/Skill'
import SkillFactory from 'domains/SkillFactory'
import SkillCloudFactory from 'domains/SkillCloudFactory'
import SkillCloudLayout from 'components/service/SkillCloudLayout'
import * as React from 'react'
import {Component, PropTypes} from 'react'
import {List} from 'immutable'
import match from 'match-case'

const d3 = require('d3')
const color = d3.scale.category10()

interface Props {
  cloud: SkillCloud
  selected: SkillNode
  zoomper: number
  onRide: (skill: Skill)=>void
  onDown: (skill: Skill)=>void
}

export default class SkillCloudCanvas extends Component<Props, any>
{
  private layout: SkillCloudLayout
  private svg: any

  render() {
    return (
      <div className="module-skillcloud">
        <svg ref="svg"></svg>
      </div>
    )
  }

  componentDidMount() {
    this.init().resize()
    window.addEventListener('resize', this.resizeEvent)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEvent)
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.selected !== prevProps.selected) {
      const {cloud, selected} = this.props
      // Two-step node update @todo complex
      if (prevProps.selected) {
        this.resize().draw(cloud.filter(null))
        if (selected) {
          setTimeout(() => this.draw(cloud.filter(selected)), 100)
        }
      } else {
        this.draw(cloud.filter(selected))
      }
    }
    if (this.props.zoomper !== prevProps.zoomper) {
      this.translate()
    }
  }

  private init(): SkillCloudCanvas {
    this.svg = d3.select(
      React.findDOMNode(this.refs['svg'])
    )
    this.layout = new SkillCloudLayout().onTick(() => {
      this.svg.selectAll('line')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
      this.svg.selectAll('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      this.svg.selectAll('text')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      this.svg.selectAll('image')
      .attr('x', d => d.x - d.skill.image.width/2)
      .attr('y', d => d.y - d.skill.image.height/2)
    })

    return this
  }

  private viewX: number
  private viewY: number
  private viewWidth: number
  private viewHeight: number
  private resize(): SkillCloudCanvas {
    const box = this.svg.node().getBoundingClientRect()
    this.viewX = 0
    this.viewY = 0
    this.viewWidth = box.width
    this.viewHeight = box.height
    const drag = d3.behavior.drag().on('drag', () => {
      this.viewX -= d3.event.dx
      this.viewY -= d3.event.dy
      this.translate()
    })
    this.svg
    .call(drag)
    this.translate()
    this.layout.resize(box.width, box.height)

    return this
  }
  private translate(): void {
    const {zoomper} = this.props
    const scale = 100 / zoomper
    const box = this.svg.node().getBoundingClientRect()
    let viewWidthPre = this.viewWidth
    let viewHeightPre = this.viewHeight
    this.viewWidth = box.width * scale
    this.viewHeight = box.height * scale
    this.viewX += (viewWidthPre - this.viewWidth) / 2
    this.viewY += (viewHeightPre - this.viewHeight) / 2
    this.svg.attr(
      'viewBox',
      `${this.viewX} ${this.viewY} ${this.viewWidth} ${this.viewHeight}`
    )
  }

  private draw(cloud: SkillCloud): SkillCloudCanvas {
    this.insertAndRemove(cloud).update(cloud)
    this.layout.update(cloud)

    return this
  }

  private insertAndRemove(cloud: SkillCloud): SkillCloudCanvas {
    const link = this.svg.selectAll('line')
    .data(cloud.links.toArray())
    link.exit().remove()
    link.enter().append('line')

    const node = this.svg.selectAll('g')
    .data(cloud.nodes.toArray(), d => d.id)

    const g = node.enter().append('g')
    .call(
      this.layout.drag()
      .on("dragstart", () => d3.event.sourceEvent.stopPropagation())
    )
    .on('click', d => this.select(d))
    .on('mouseover', d => this.ride(d))
    .on('mouseout', d => this.down(d))

    const gText = g.filter(d => d.skill.image == undefined)
    gText.append('circle')
    gText.append('text')
    .attr('dx', 10)
    .attr('dy', '.35em')
    .text(d => d.skill.name)
    const gImage = g.filter(d => d.skill.image != undefined)
    gImage.append('image')
    .attr('width', d => d.skill.image.width)
    .attr('height', d => d.skill.image.height)
    .attr('xlink:href', d => d.skill.image.data)
    .on('click', d => {
      if (d.skill.image.href) open(d.skill.image.href, '_blank')
    })

    node.exit().remove()

    return this
  }

  private update(cloud: SkillCloud): SkillCloudCanvas {
    const {selected} = this.props
    this.svg.selectAll('g').
    attr("class", d =>
      match<string>(cloud.isIncludeNode(d)).
        caseOf(true, `${d.classes} active` + (d===selected ? ' selected' : '')).
        caseOfElse(d.classes).
      end()
    )

    this.svg.selectAll('g circle')
    .attr("r", d => d.radius(cloud.isIncludeNode(d)))
    .style("fill", (d, i) => color(d.group))

    this.svg.selectAll('g text')
    .transition()
    .style('font-size', d => d.fontSize)

    this.svg.selectAll('line')
    .style('visibility', d => d.target.skill.image ? 'hidden' : 'visible')

    return this
  }

  private ride(node: SkillNode) {
    const {onRide} = this.props;
    onRide(node.skill)
  }

  private down(node: SkillNode) {
    const {onDown} = this.props;
    onDown(node.skill)
  }

  private select(node: SkillNode) {
    if (!d3.event.defaultPrevented && node.skill.hasChildren && !node.isGrandChild) {
      // @todo messy
      const {cloud} = this.props;
      location.hash = encodeURI(
        `cloud/skill/${node !== cloud.rootNode ? node.skill.name : ''}`
      )
    }
  }

  private resizeEvent = e => {
    this.resize()
  }
}
