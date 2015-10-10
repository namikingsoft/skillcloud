import React, {Component, PropTypes} from 'react'
import d3 from 'd3'

const format = d3.format(",d")
const color = d3.scale.category20c()

export default class Pack extends Component
{
  render() {
    return (
      <div className="pack">
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
  }

  init() {
    this.pack = d3.layout.pack()
    .value(d => d.size)

    this.vis = this.svg()
    .append("svg:g")

    this.resize()
    this.update()
  }

  resize() {
    const box = this.svg().node().getBoundingClientRect()
    this.w = box.width
    this.h = box.height
    this.r = box.height
    this.x = d3.scale.linear().range([0, this.r])
    this.y = d3.scale.linear().range([0, this.r])
    this.pack.size([this.r, this.r])
    this.vis.attr("transform", `translate(${(this.w-this.r)/2},${(this.h-this.r)/2})`)
  }

  update() {
    const {data} = this.props
    let nodes = this.pack.nodes(data)
    this.vis.selectAll("circle")
    .data(nodes)
    .enter().append("svg:circle")
    .attr("class", d => d.children ? "parent" : "child")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", d => d.r)
    .on("click", d => this.zoom(this.node == d ? data : d))
    this.vis.selectAll("text")
    .data(nodes)
    .enter().append("svg:text")
    .attr("class", d => d.children ? "parent" : "child")
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .style("opacity", d => d.r > 20 ? 1 : 0)
    .text(d => d.name)
    d3.select(window).on("click", () => this.zoom(data))
  }

  zoom(d, i) {
    const k = this.r / d.r / 2;
    const x = this.x
    const y = this.y
    x.domain([d.x - d.r, d.x + d.r])
    y.domain([d.y - d.r, d.y + d.r])

    const t = this.vis.transition()
    .duration(d3.event.altKey ? 7500 : 750)

    t.selectAll("circle")
    .attr("cx", d => x(d.x))
    .attr("cy", d => y(d.y))
    .attr("r", d => k * d.r)

    t.selectAll("text")
    .attr("x", d => x(d.x))
    .attr("y", d => y(d.y))
    .style("opacity", d => k * d.r > 20 ? 1 : 0)

    this.node = d
    d3.event.stopPropagation()
  }

  svg() {
    return d3.select(this.refs.svg.getDOMNode())
  }
}
