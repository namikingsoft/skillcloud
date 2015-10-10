import React, {Component, PropTypes} from 'react'
import {filter} from 'lodash'
import d3 from 'd3'

const color = d3.scale.category20()

export default class Force extends Component
{
  static propTypes = {
    data: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
  }

  static defaultProps = {
  }

  render() {
    return (
      <div className="force">
        <svg ref="svg"></svg>
      </div>
    )
  }

  componentDidMount() {
    this.init()
    window.addEventListener('resize', () => {this.resize()})
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => {this.resize()})
  }

  componentDidUpdate() {
    this.update()
  }

  init() {
    this.force = d3.layout.force()
    .gravity(0.05)
    .charge(function(d, i) { return i ? 0 : 0 })

    this.svg = d3.select(this.refs.svg.getDOMNode())

    this.dataset()
    this.resize()
    this.update()
  }

  resize() {
    const box = this.svg.node().getBoundingClientRect();
    let viewX = 0;
    let viewY = 0;
    let viewWidth = box.width;
    let viewHeight = box.height;
    var drag = d3.behavior.drag().on('drag', () => {
      viewX -= d3.event.dx;
      viewY -= d3.event.dy;
      this.svg.attr('translate', viewX+' '+viewY);
    });
    var zoom = d3.behavior.zoom().on('zoom', () => {
      let viewWidthPre = viewWidth;
      let viewHeightPre = viewHeight;
      viewWidth = box.width * d3.event.scale;
      viewHeight = box.height * d3.event.scale;
      viewX += (viewWidthPre - viewWidth) / 2;
      viewY += (viewHeightPre - viewHeight) / 2;
      this.svg.attr('viewBox', viewX+' '+viewY+' '+viewWidth+' '+viewHeight);
    });
    this.force.size([box.width, box.height]);
    this.svg
    .call(drag)
    .call(zoom) // @todo touch device
    .attr('viewBox', viewX+' '+viewY+' '+box.width+' '+box.height);
  }

  dataset() {
    const {data} = this.props
    let nodes = []
    let groupSeq = 0
    function dataset(children) {
      const groupNo = ++groupSeq
      for (const child of children) {
        if (child.children) {
          dataset(child.children)
        } else {
          nodes.push({
            group: groupNo,
            no: nodes.length+1,
            name: child.name,
            experience: child.exp,
            interest: child.want,
            size: 12,
            radius: 12*3,
          })
        }
      }
    }
    dataset(data.children)
    this.nodes = nodes
  }

  update() {
    console.log(this.nodes)
    const node = this.svg.selectAll(".node")
    .data(this.nodes, d => {
      return d.no.toString();
    })
    node.exit().remove()
    console.log(node.enter().size())
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
    .on('click', d => {
      this.update()
    })
    .call(
      this.force.drag()
      .on("dragstart", function() {
        d3.event.sourceEvent.stopPropagation()
      })
    )
    /*
    node.attr('dataset', d => {
      const {type} = this.props
      const size = type == 'experience' ? d.experience : d.interest
      d.size = size
      d.radius = size*3
      })
      */

    g.append("svg:circle")
    .attr("r", d => d.radius - 2)
    .style("fill", (d, i) => color(d.group))

    g.append("svg:text")
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .style('font-size', d => d.size)
    .text(d => d.name)

    this.force
    .nodes(this.nodes)
    .start()
    .on("tick", e => {
      var q = d3.geom.quadtree(this.nodes)
      for (const node of this.nodes) {
        q.visit(this.collide(node))
        }
      this.svg.selectAll("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      this.svg.selectAll("text")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
    })
  }

  collide(node) {
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
