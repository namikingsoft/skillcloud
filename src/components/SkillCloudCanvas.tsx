import SkillCloud from 'domains/SkillCloud'
import SkillNode from 'domains/SkillNode'
import Skill from 'domains/Skill'
import SkillFactory from 'domains/SkillFactory'
import SkillCloudFactory from 'domains/SkillCloudFactory'
import SkillCloudLayout from 'components/service/SkillCloudLayout'
import * as React from 'react'
import {Component, PropTypes} from 'react'

const d3 = require('d3')
const color = d3.scale.category20()

interface Props {
  cloud: SkillCloud
  selected: SkillNode
  onSelect: (skill: Skill)=>void
}

export default class SkillCloudCanvas extends Component<Props, any>
{
  private layout: SkillCloudLayout
  private svg: any

  render() {
    return (
      <div className="skillcloud">
        <svg ref="svg"></svg>
      </div>
    )
  }

  componentDidMount() {
    this.init().resize()
    window.addEventListener('resize', () => this.resize())

    const {cloud, onSelect} = this.props
    onSelect(null);setTimeout(() => {
      onSelect(cloud.nodes.get(0).skill)
    }, 3000)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.resize())
  }

  componentDidUpdate() {
    const {cloud, selected} = this.props
    this.draw(cloud.filter(selected))
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
      this.svg.attr('translate', `${viewX} ${viewY}`)
    })
    const zoom = d3.behavior.zoom().on('zoom', () => {
      let viewWidthPre = viewWidth
      let viewHeightPre = viewHeight
      viewWidth = box.width * d3.event.scale
      viewHeight = box.height * d3.event.scale
      viewX += (viewWidthPre - viewWidth) / 2
      viewY += (viewHeightPre - viewHeight) / 2
      this.svg.attr('viewBox', `${viewX} ${viewY} ${viewWidth} ${viewHeight}`)
    })
    this.svg
    .call(drag)
    .call(zoom) // @todo touch device
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
    const {onSelect} = this.props

    const node = this.svg.selectAll('g')
    .data(cloud.nodes.toArray(), d => d.id)

    const g = node.enter().append('g')
    .on('click', d => onSelect(d.skill))
    .call(
      this.layout.drag()
      .on("dragstart", function() {
        d3.event.sourceEvent.stopPropagation()
      })
    )
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
    this.svg.selectAll('g')
    .attr("class", d => {
      if (d.skill.children.find(skill => cloud.nodes.find(n => n.skill == skill))) {
        return `${d.classes} active`
      }
      return d.classes
    })

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
}
