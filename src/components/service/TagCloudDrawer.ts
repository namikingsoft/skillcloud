import TagCloudLayout from 'components/service/TagCloudLayout'
import TagNode from 'domains/TagNode'
import {List} from 'immutable'

const d3 = require('d3')
const color = d3.scale.category20()

export default class TagCloudDrawer
{
  private svg: any
  private layout: TagCloudLayout

  constructor(private param: {
    nodes: List<TagNode>,
    svgElement: any,
  }) {
    this.svg = d3.select(this.svgElement)
    this.layout = new TagCloudLayout(this.nodes, () => {
      this.svg.selectAll("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      this.svg.selectAll("text")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
    })
  }

  resize(): TagCloudDrawer {
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

  start(): TagCloudDrawer {
    const node = this.svg.selectAll("g")
    .data(this.nodes.toArray(), d => d.id)

    const g = node.enter()
    .append("g")
    .on('mouseover', d => {
      this.svg.selectAll(`g.group${d.group} circle`)
      .transition()
      .duration(200)
      .style("fill-opacity", 1)
    })
    .on('mouseout', d => {
      this.svg.selectAll(`g.group${d.group} circle`)
      .transition()
      .duration(200)
      .style("fill-opacity", 0.4)
    })
    .call(this.layout.drag())

    g.append("circle")
    g.append("text")

    this.resize().update()
    this.layout.start()

    return this
  }

  update(): TagCloudDrawer {
    // @todo for fix force freeze
    this.layout.start()

    this.svg.selectAll('g')
    .attr("class", d => "group" + d.group)

    this.svg.selectAll('g circle')
    .transition()
    .attr("r", d => d.radius - 2)
    .style("fill", (d, i) => color(d.group))

    this.svg.selectAll('g text')
    .transition()
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .style('font-size', d => d.fontSize)
    .text(d => d.tag.name)

    return this
  }

  private get nodes(): List<TagNode> {
    return this.param.nodes
  }

  private get svgElement(): any {
    return this.param.svgElement
  }
}
