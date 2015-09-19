import React, { Component, PropTypes } from 'react';
import d3 from 'd3';

export default
class Cloud extends Component
{
  render() {
    return (
      <div className="cloud">
        <svg ref="svg"></svg>
      </div>
    );
  }

  componentDidMount() {
    this.init();
    window.addEventListener('resize', ()=>{this.resize()});
  }

  componentWillUnmount() {
    window.removeEventListener('resize', ()=>{this.resize()});
  }

  componentDidUpdate() {
  }

  init() {
    this.index = 0;
    this.graph = {
      nodes: [],
      links: [],
    };
    this.force = d3.layout.force()
    .charge(-800)
    .gravity(0.1)
    .friction(0.7)
    .linkDistance(125)
    .linkStrength(3)
    .theta(0.8);
    this.resize();
    this.add(['Word1', 'Word2', 'Word3']);
  }

  add(keys) {
    var nodes = [];
    var links = [];
    for (const key of keys) {
      nodes.push({
        name: key,
        myindex: this.index,
      });
      if (this.index > 0) {
        links.push({
          source: this.index-1,
          target: this.index,
        });
      }
      this.index++;
    }
    Array.prototype.push.apply(this.graph.nodes, nodes);
    Array.prototype.push.apply(this.graph.links, links);
    this.update();
  }

  update() {
    const svg = this.svg();
    const color = d3.scale.category20().range();

    const node = svg.selectAll('.node')
    .data(this.graph.nodes)
    .attr('class', function(d) {
      const classes = 'node node'+d.myindex;
      return classes;
    });

    node.exit()
    .remove();

    const g = node.enter()
    .append('g')
    .attr('class', function(d) {
      var classes = 'node';
      if (d.parent) {
        classes += ' parent';
      }
      return classes;
    })
    .call(
      this.force.drag()
      .on("dragstart", function() {
        d3.event.sourceEvent.stopPropagation();
      })
    );

    g.append('circle')
    .style('fill', function(d) {
      return color[0];
    })
    .transition()
    .attr('r', function(d) {
      return 5;
    });

    g.append('text')
    .text(function(d) { return d.name; })
    .attr('dx', 10)
    .attr('dy', '.35em');

    const link = svg.selectAll('.link')
    .data(this.graph.links);

    link.exit()
    .remove();

    link.enter()
    .append('line')
    .attr('class', 'link')
    .style('stroke-width', 1);

    this.force.on('tick', function() {
      svg.selectAll('.link')
      .attr('x1', function(d) { return d.source.x; })
      .attr('y1', function(d) { return d.source.y; })
      .attr('x2', function(d) { return d.target.x; })
      .attr('y2', function(d) { return d.target.y; });

      svg.selectAll('circle')
      .attr('cx', function(d) { return d.x; })
      .attr('cy', function(d) { return d.y; });

      svg.selectAll('text')
      .attr('x', function(d) { return d.x; })
      .attr('y', function(d) { return d.y; });
    })
    .nodes(this.graph.nodes)
    .links(this.graph.links)
    .start();
  }

  resize() {
    const box = this.svg().node().getBoundingClientRect();
    //this.svg().attr('viewBox', box.left+' '+box.top+' '+box.width+' '+box.height);
    this.force.size([box.width, box.height]);
  }

  svg() {
    return d3.select(this.refs.svg.getDOMNode());
  }
}
