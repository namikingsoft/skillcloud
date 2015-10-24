import TagCloud from 'domains/TagCloud'

const d3 = require('d3')
const color = d3.scale.category20()

export default class TagCloudDrawer
{
  private svg: any
  private layout: TagCloudLayout

  constructor(private param: {
    cloud: TagCloud,
    svgElement: any,
  }) {
    this.svg = d3.select(this.svgElement)
    this.layout = new TagCloudLayout(this.cloud.nodes, () => {
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

  update(): TagCloudDrawer {
    const node = this.svg.selectAll("g")
    .data(this.cloud.nodes, d => d.id)

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
    .call(
      this.layout.force.drag()
      .on("dragstart", function() {
        d3.event.sourceEvent.stopPropagation()
      })
    )
    g.append("circle")
    g.append("text")

    node.exit().remove()

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
    .style('font-size', d => d.size)
    .text(d => d.name)

    return this
  }
}

class TagCloudLayout
{
  private force: any

  constructor(cloud: TagCloud, position: Function) {
    this.force = d3.layout.force()
    .gravity(0.05)
    .charge(0)
    .size([this.param.width, this.param.height])
    .on("tick", e => {
      var q = d3.geom.quadtree(this.nodes)
      for (const node of this.nodes) {
        q.visit(this.collide(node))
      }
      this.param.position();
    })
    .nodes(this.nodes)
  }

  get force(): any {
    return this.force
  }

  resize(width: number, height: number) {
    this.force.size([width, height])
  }

  start() {
    this.force.start()
  }

  private collide(node) {
    var r = node.radius + 16,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r
    return function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== node)) {
        var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = node.radius + quad.point.radius
        if (l < r) {
          l = (l - r) / l * .5
          node.x -= x *= l
          node.y -= y *= l
          quad.point.x += x
          quad.point.y += y
        }
      }
      return x1 > nx2
          || x2 < nx1
          || y1 > ny2
          || y2 < ny1
    }
  }

  private get cloud(): TagCloud {
    return this.param.cloud
  }

  private get svgElement(): any {
    return this.param.svgElement
  }
}
