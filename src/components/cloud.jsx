import React, { Component, PropTypes } from 'react'
import {forEach, filter} from 'lodash'
import d3 from 'd3'

export default class Cloud extends Component
{
  render() {
    return (
      <div className="cloud">
        <svg ref="svg"></svg>
      </div>
    )
  }

  componentDidMount() {
    this.init()
    window.addEventListener('resize', () => this.resize())
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.resize())
  }

  componentDidUpdate() {
    const {selected} = this.props
    this.resize()
    this.dataset(selected)
  }

  init() {
    this.force = d3.layout.force()
    this.svg = d3.select(this.refs.svg.getDOMNode())
    this.make()
    this.resize()
    this.dataset()
    const {data, onSelect} = this.props
    onSelect(null)
    setTimeout(() => {
      onSelect(data)
    }, 3000)
  }

  make(rows, parentNode) {
    const {data} = this.props
    const root = {
      row: data,
      active: true,
    }
    root.row.group = 0
    root.row.depth = 0
    const add = (rows, parentNode = root) => {
      let groupIndex = 0
      for (let row of rows) {
        row.group = parentNode.row.group ? parentNode.row.group : ++groupIndex
        row.depth = parentNode.row.depth + 1
        const node = {row, parentNode}
        const link = {
          source: parentNode,
          target: node,
        }
        this.graph.nodes.push(node)
        this.graph.links.push(link)
        if (row.rows) {
          add(row.rows, node)
        }
      }
    }
    this.graph = {
      nodes: [root],
      links: [],
    }
    add(data.rows)
  }

  dataset(selected = null) {
    const nodes = filter(this.graph.nodes, node => {
      if (!selected || selected.group == node.row.group || node.row.depth < 2) {
        return true
      } else {
        return false
      }
    })
    const links = filter(this.graph.links, link => {
      let includeTarget, includeSource = false
      for (const node of nodes) {
        if (node == link.target) {
          includeTarget = true
        }
        if (node == link.source) {
          includeSource = true
        }
      }
      return includeTarget && includeSource
    })
    forEach(this.graph.nodes, node => {
      if (node.row.rows && (!selected || selected.group == node.row.group)) {
        node.active = true
      } else {
        node.active = false
      }
    })
    this.update(nodes, links)
  }

  update(nodes, links) {
    const svg = this.svg
    const color = d3.scale.category20().range()

    const node = svg.selectAll('.node')
    .data(nodes, d => this.nodeKey(d))

    node.exit()
    .remove()

    const g = node.enter().append('g')
    .on('click', d => {
      if (d3.event.defaultPrevented) return
      const {data, onSelect} = this.props
      if (d.row.depth == 1) {
        onSelect(d.row)
      } else {
        onSelect(data)
      }
    })
    .call(
      this.force.drag()
      .on("dragstart", function() {
        d3.event.sourceEvent.stopPropagation()
      })
    )
    g.append('circle')
    g.append('text')

    svg.selectAll('g')
    .attr('class', d => {
      var classes = 'node'
      if (d == this.graph.nodes[0]) {
        classes += ' root'
      }
      if (d.active) {
        classes += ' active'
      }
      if (d.row.depth > 1) {
        classes += ' grandchild'
      }
      return classes
    })

    svg.selectAll('g circle')
    .style('fill', d => {
      return color[d.row.group%20]
    })

    svg.selectAll('g text')
    .text(d => d.row.name)
    .attr('dx', 10)
    .attr('dy', '.35em')
    .style('font-size', d => {
      switch (d.row.depth) {
        case 0: return 11
        case 1: return 20
        case 2: return 16
        case 3: return 11
      }
      return 12
    })
    .style('fill', d => {
      const {selected} = this.props
      return (selected == d.row) ? 'yellow' : '#fff'
    })


    const link = svg.selectAll('.link')
    .data(links)

    link.exit().remove()

    link.enter()
    .append('line')
    .attr('class', 'link')

    this.force
    .nodes(nodes)
    .links(links)
    .charge(-7500)
    .gravity(0.5)
    .friction(0.7)
    .linkDistance(d => {
      const {selected} = this.props
      if (selected == d.target.row) {
        return 100
      } else if (d.source.row.depth > 1) {
        return 10
      } else {
        return 50
      }
    })
    .linkStrength(3)
    .theta(0.8)
    .on('tick', () => {
      svg.selectAll('.link')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)

      svg.selectAll('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)

      svg.selectAll('text')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
    })
    .start()
  }

  resize() {
    const box = this.svg.node().getBoundingClientRect()
    let viewX = 0
    let viewY = 0
    let viewWidth = box.width
    let viewHeight = box.height
    var drag = d3.behavior.drag().on('drag', () => {
      viewX -= d3.event.dx
      viewY -= d3.event.dy
      this.svg.attr('translate', viewX+' '+viewY)
    })
    var zoom = d3.behavior.zoom().on('zoom', () => {
      let viewWidthPre = viewWidth
      let viewHeightPre = viewHeight
      viewWidth = box.width * d3.event.scale
      viewHeight = box.height * d3.event.scale
      viewX += (viewWidthPre - viewWidth) / 2
      viewY += (viewHeightPre - viewHeight) / 2
      this.svg.attr('viewBox', `${viewX} ${viewY} ${viewWidth} ${viewHeight}`)
    })
    this.force.size([box.width, box.height])
    this.svg
    .call(drag)
    .call(zoom) // @todo touch device
    .attr('viewBox', `${viewX} ${viewY} ${box.width} ${box.height}`)
  }

  nodeKey(node) {
    if (node.parentNode) {
      return `${this.nodeKey(node.parentNode)}::${node.row.name}`
    } else {
      return node.row.name
    }
  }

  nodeRow(row) {
    for (const node of this.graph.nodes) {
      if (this.keyRow(row) == this.keyRow(node.row)) {
        return node
      }
    }
    return null
  }
}
