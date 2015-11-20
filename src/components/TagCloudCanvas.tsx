import TagNode from 'domains/TagNode'
import TagCloud from 'domains/TagCloud'
import TagCloudLayout from 'components/service/TagCloudLayout'
import * as React from 'react'
import {Component, PropTypes} from 'react'
import {List} from 'immutable'

const d3 = require('d3')
const color = d3.scale.category20()

interface Props {
  cloud: TagCloud
  mode: string
  onSelect: (node: TagNode)=>void
}

export default class TagCloudCanvas extends Component<Props, any>
{
  private svg: any
  private layout: TagCloudLayout
  private preMode: string

  render() {
    return (
      <div className="module-tagcloud">
        <svg ref="svg"></svg>
      </div>
    )
  }

  componentDidMount() {
    const {cloud, mode} = this.props
    this.init().resize().draw(cloud.nodes, mode)
    this.preMode = mode
    window.addEventListener('resize', () => this.resize())
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.resize())
  }

  componentDidUpdate() {
    const {cloud, mode} = this.props
    if (mode !== this.preMode) {
      this.draw(cloud.nodes, mode)
      this.preMode = mode
    }
  }

  private init(): TagCloudCanvas {
    this.svg = d3.select(
      React.findDOMNode(this.refs['svg'])
    )
    this.layout = new TagCloudLayout().onTick(() => {
      this.svg.selectAll("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      this.svg.selectAll("text")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
    })

    return this
  }

  private resize(): TagCloudCanvas {
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
    this.svg
    .call(drag)
    .attr('viewBox', `${viewX} ${viewY} ${box.width} ${box.height}`)
    this.layout.resize(box.width, box.height)

    return this
  }

  private draw(nodes: List<TagNode>, mode: string): TagCloudCanvas {
    this.insertAndRemove(nodes).update()
    this.layout.update(nodes, mode) // for force freeze

    return this
  }

  private insertAndRemove(nodes: List<TagNode>): TagCloudCanvas {
    const node = this.svg.selectAll("g")
    .data(nodes.toArray(), d => d.id)

    const g = node.enter()
    .append("g")
    .on('mouseover', d => {
      this.svg.selectAll(`g.group${d.group} circle`)
      .transition()
      .duration(200)
      .style("fill-opacity", 1)
      const {onSelect} = this.props
      onSelect(d)
    })
    .on('mouseout', d => {
      this.svg.selectAll(`g.group${d.group} circle`)
      .transition()
      .duration(200)
      .style("fill-opacity", 0.4)
    })
    .on('mousedown', d => {
      const {onSelect} = this.props
      onSelect(d)
    })
    .call(this.layout.drag())

    g.append("circle")
    g.append("text")

    return this
  }

  private update(): TagCloudCanvas {
    const {mode} = this.props

    this.svg.selectAll('g')
    .attr("class", d => "group" + d.group)

    this.svg.selectAll('g circle')
    .transition()
    .attr("r", d => d.radius(mode) - 2)
    .style("fill", (d, i) => color(d.group))

    this.svg.selectAll('g text')
    .transition()
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .style('font-size', d => d.fontSize(mode))
    .text(d => d.tag.name)

    return this
  }
}
