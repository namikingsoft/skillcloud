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
    window.addEventListener('resize', () => this.resize())
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.resize())
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.selected !== prevProps.selected) {
      const {cloud, selected} = this.props
      this.resize().draw(cloud.filter(selected))
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
    })

    return this
  }

  private resize(): SkillCloudCanvas {
    const box = this.svg.node().getBoundingClientRect()
    let viewX = 0
    let viewY = 0
    let viewWidth = box.width
    let viewHeight = box.height
    const drag = d3.behavior.drag().on('drag', () => {
      viewX -= d3.event.dx
      viewY -= d3.event.dy
      this.svg.attr('viewBox', `${viewX} ${viewY} ${box.width} ${box.height}`)
    })
    this.svg
    .call(drag)
    .attr('viewBox', `${viewX} ${viewY} ${box.width} ${box.height}`)
    this.layout.resize(box.width, box.height)

    return this
  }

  private draw(cloud: SkillCloud): SkillCloudCanvas {
    this.insertAndRemove(cloud).update(cloud)
    this.layout.update(cloud)

    return this
  }

  private insertAndRemove(cloud: SkillCloud): SkillCloudCanvas {
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
    g.append('circle')
    g.append('text')

    node.exit().remove()

    const link = this.svg.selectAll('line')
    .data(cloud.links.toArray())
    link.exit().remove()
    link.enter().append('line')

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
    .transition()
    .style("fill", (d, i) => color(d.group))

    this.svg.selectAll('g text')
    .transition()
    .attr('dx', 10)
    .attr('dy', '.35em')
    .style('font-size', d => d.fontSize)
    .text(d => d.skill.name)

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
    if (!d3.event.defaultPrevented && node.skill.hasChildren) {
      const {cloud} = this.props;
      location.hash = `skill/${node.skill.name}`
    }
  }
}
