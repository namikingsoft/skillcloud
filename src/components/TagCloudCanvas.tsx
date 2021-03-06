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
  zoomper: number
  onRide: (node: TagNode)=>void
  onDown: (node: TagNode)=>void
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
    window.addEventListener('resize', this.resizeEvent)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEvent)
  }

  componentDidUpdate(prevProps: Props) {
    const {cloud, mode} = this.props
    if (mode !== this.preMode) {
      this.draw(cloud.nodes, mode)
      this.preMode = mode
    }
    if (this.props.zoomper !== prevProps.zoomper) {
      this.translate()
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

  private viewX: number
  private viewY: number
  private viewWidth: number
  private viewHeight: number
  private resize(): TagCloudCanvas {
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
    .call(this.layout.drag())
    .on('mouseover', d => {
      this.svg.selectAll(`g.group${d.group} circle`)
      .transition()
      .duration(200)
      .style("fill-opacity", 1)
      this.ride(d)
    })
    .on('mouseout', d => {
      this.svg.selectAll(`g.group${d.group} circle`)
      .transition()
      .duration(200)
      .style("fill-opacity", 0.4)
      const {onDown} = this.props
      onDown(d)
    })
    .on('mousedown', d => this.ride(d))
    //.on('mouseup', d => this.props.onDown(d))

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

  private resizeEvent = e => {
    this.resize()
  }

  private ride(node: TagNode) {
    if (d3.event.buttons > 0) {
      // do nothing while draging
      return
    }
    const {onRide} = this.props;
    onRide(node)
  }
}
