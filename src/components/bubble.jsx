import React, {Component, PropTypes} from 'react'
import {filter} from 'lodash'
import d3 from 'd3'

const format = d3.format(",d")
const color = d3.scale.category20c()

export default class Bubble extends Component
{
  render() {
    return (
      <div className="babble">
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
    this.bubble = d3.layout.pack()
    .sort(null)
    .padding(1.5)

    this.svg()
    .attr("class", "bubble")

    this.resize()
    this.update()
  }

  resize() {
    const box = this.svg().node().getBoundingClientRect()
    this.bubble.size([box.width, box.height])
  }

  update() {
    const {data} = this.props

    let node = this.svg().selectAll(".node")
    .data(this.bubble.nodes(this.classes(data))
    .filter(d => !d.children))
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.x},${d.y})`)

    node.append("title")
    .text(d => `${d.className}:${format(d.value)}`)

    node.append("circle")
    .attr("r", d => d.r)
    .style("fill", d => color(d.packageName))

    node.append("text")
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .style('font-size', d => d.value)
    .text(d => d.className.substring(0, d.r / 3))
  }

  classes(root) {
    let classes = []
    function recurse(name, node) {
      if (node.children) {
        node.children.forEach(child => recurse(node.name, child))
      } else classes.push({
        packageName: name,
        className: node.name,
        value: node.size
      })
    }
    recurse(null, root)
    return {children: classes}
  }

  svg() {
    return d3.select(this.refs.svg.getDOMNode())
  }
}
