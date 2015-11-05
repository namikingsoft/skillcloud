import TagNode from 'domains/TagNode'
import {List} from 'immutable'

const d3 = require('d3')
const color = d3.scale.category20()

export default class TagCloudLayout
{
  private force: any
  private nodes: List<TagNode>
  private tick: ()=>void

  constructor() {
    this.nodes = List<TagNode>()
    this.tick = ()=>{}
    this.force = d3.layout.force()
    .gravity(0.05)
    .charge(0)
    .on("tick", e => {
      var q = d3.geom.quadtree(this.nodes.toArray())
      this.nodes.forEach(node => {
        q.visit(this.collide(node))
      })
      this.tick();
    })
  }

  drag(): any {
    return this.force.drag()
    .on("dragstart", function() {
      d3.event.sourceEvent.stopPropagation()
    })
  }

  resize(width: number, height: number): TagCloudLayout {
    this.force.size([width, height])
    return this
  }

  update(nodes: List<TagNode>): TagCloudLayout {
    this.nodes = nodes
    this.force.nodes(nodes.toArray()).start()
    return this
  }

  onTick(tick: ()=>void) {
    this.tick = tick
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
}