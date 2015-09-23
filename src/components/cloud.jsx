import React, { Component, PropTypes } from 'react';
import { filter } from 'lodash';
import d3 from 'd3';

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
    window.addEventListener('resize', () => {this.resize()});
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => {this.resize()});
  }

  componentDidUpdate() {
    const { selected } = this.props;
    this.resize();
    this.dataset(selected);
  }

  init() {
    this.force = d3.layout.force()
    .charge(-7500)
    .gravity(1.0)
    .friction(0.7)
    .linkDistance(100)
    .linkStrength(3)
    .theta(0.8);
    this.make();
    this.resize();
    this.dataset();
    setTimeout(() => {
      const { data, actions } = this.props;
      actions.select(data);
    }, 5000);
  }

  make(rows, parentNode) {
    const { data } = this.props;
    const root = {
      row: data,
      active: true,
    };
    const add = (rows, parentNode = root) => {
      for (const row of rows) {
        const node = {
          row: row,
          parentNode: parentNode,
        };
        const link = {
          source: parentNode,
          target: node,
        };
        this.graph.nodes.push(node);
        this.graph.links.push(link);
        if (row.rows) {
          add(row.rows, node);
        }
      }
    };
    this.graph = {
      nodes: [root],
      links: [],
    };
    add(data.rows);
  }

  dataset(selected = null) {
    const nodes = filter(this.graph.nodes, node => {
      if (node.row.comment || !selected || selected.group == node.row.group) {
        if (node.row.comment && (!selected || selected.group == node.row.group)) {
          node.active = true;
        } else {
          node.active = false;
        }
        return true;
      }
      return false;
    });
    const links = filter(this.graph.links, link => {
      let includeTarget, includeSource = false;
      for (const node of nodes) {
        if (node == link.target) {
          includeTarget = true;
        }
        if (node == link.source) {
          includeSource = true;
        }
      }
      return includeTarget && includeSource;
    });
    this.update(nodes, links);
  }

  update(nodes, links) {
    const svg = this.svg();
    const color = d3.scale.category20().range();

    const node = svg.selectAll('.node')
    .data(nodes, (d) => {
      return this.keyRow(d.row);
    });

    node.exit()
    .remove();

    const g = node.enter().append('g')
    .on('click', (d) => {
      if (d3.event.defaultPrevented) return;
      const { actions } = this.props;
      actions.select(d.row);

    })
    .call(
      this.force.drag()
      .on("dragstart", function() {
        d3.event.sourceEvent.stopPropagation();
      })
    );
    g.append('circle');
    g.append('text');

    svg.selectAll('g')
    .attr('class', (d) => {
      var classes = 'node';
      if (d == this.graph.nodes[0]) {
        classes += ' root';
      }
      if (d.active) {
        classes += ' active';
      }
      return classes;
    })

    svg.selectAll('g circle')
    .style('fill', (d) => {
      return color[d.row.group%20];
    });

    svg.selectAll('g text')
    .text((d) => { return d.row.name; })
    .attr('dx', 10)
    .attr('dy', '.35em')
    .style('font-size', (d) => { return d.row.score; });


    const link = svg.selectAll('.link')
    .data(links);

    link.exit().remove();

    link.enter()
    .append('line')
    .attr('class', 'link');

    this.force.on('tick', () => {
      svg.selectAll('.link')
      .attr('x1', (d) => { return d.source.x; })
      .attr('y1', (d) => { return d.source.y; })
      .attr('x2', (d) => { return d.target.x; })
      .attr('y2', (d) => { return d.target.y; });

      svg.selectAll('circle')
      .attr('cx', (d) => { return d.x; })
      .attr('cy', (d) => { return d.y; });

      svg.selectAll('text')
      .attr('x', (d) => { return d.x; })
      .attr('y', (d) => { return d.y; });
    })
    .nodes(nodes)
    .links(links)
    .start();
  }

  resize() {
    const box = this.svg().node().getBoundingClientRect();
    let viewX = 0;
    let viewY = 0;
    let viewWidth = box.width;
    let viewHeight = box.height;
    var drag = d3.behavior.drag().on('drag', () => {
      viewX -= d3.event.dx;
      viewY -= d3.event.dy;
      this.svg().attr('translate', viewX+' '+viewY);
    });
    var zoom = d3.behavior.zoom().on('zoom', () => {
      let viewWidthPre = viewWidth;
      let viewHeightPre = viewHeight;
      viewWidth = box.width * d3.event.scale;
      viewHeight = box.height * d3.event.scale;
      viewX += (viewWidthPre - viewWidth) / 2;
      viewY += (viewHeightPre - viewHeight) / 2;
      this.svg().attr('viewBox', viewX+' '+viewY+' '+viewWidth+' '+viewHeight);
    });
    this.force.size([box.width, box.height]);
    this.svg()
    .call(drag)
    .call(zoom) // @todo touch device
    .attr('viewBox', viewX+' '+viewY+' '+box.width+' '+box.height);
  }

  svg() {
    return d3.select(this.refs.svg.getDOMNode());
  }

  keyRow(row) {
    if (row) {
      return row.group+'::'+row.name;
    }
    return null;
  }

  nodeRow(row) {
    for (const node of this.graph.nodes) {
      if (this.keyRow(row) == this.keyRow(node.row)) {
        return node;
      }
    }
    return null;
  }
}

Cloud.propTypes = {
  actions: PropTypes.object.isRequired
};

export default Cloud;
