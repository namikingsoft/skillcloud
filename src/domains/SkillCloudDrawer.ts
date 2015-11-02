import SkillCloudLayout from 'domains/SkillCloudLayout'
import SkillCloud from 'domains/SkillCloud'
import SkillNode from 'domains/SkillNode'

const d3 = require('d3')
const color = d3.scale.category20()

export default class SkillCloudDrawer
{
  private svg: any
  private layout: SkillCloudLayout

  constructor(private param: {
    svgElement: any,
    onClick: (d: SkillNode)=>void,
  }) {
    this.svg = d3.select(this.svgElement)
    this.layout = new SkillCloudLayout({
      tick: () => {
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
      }
    })
    this.resize()
  }

  resize(): SkillCloudDrawer {
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

  update(cloud: SkillCloud): SkillCloudDrawer {
    const node = this.svg.selectAll('g')
    .data(cloud.nodes, d => d.id)

    node.exit().remove()

    const g = node.enter().append('g')
    .on('click', this.onClick)
    .call(
      this.layout.drag()
      .on("dragstart", function() {
        d3.event.sourceEvent.stopPropagation()
      })
    )
    g.append('circle')
    g.append('text')

    this.layout.update(cloud)

    this.svg.selectAll('g')
    .attr("class", d => d.classes)

    this.svg.selectAll('g circle')
    .transition()
    .style("fill", (d, i) => color(d.group))

    this.svg.selectAll('g text')
    .transition()
    .attr('dx', 10)
    .attr('dy', '.35em')
    .style('font-size', d => d.fontSize)
    .text(d => d.skill.name)

    const link = this.svg.selectAll('line')
    .data(cloud.links)
    link.exit().remove()
    link.enter().append('line')

    return this
  }

  private get svgElement(): any {
    return this.param.svgElement
  }

  private get onClick(): (d: SkillNode)=>void {
    return this.param.onClick
  }

}
