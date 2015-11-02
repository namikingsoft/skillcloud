import React, {Component, PropTypes} from 'react';
import {map, sortBy} from 'lodash';
import d3 from 'd3';
import nv from 'nvd3/build/nv.d3';

class Chart extends Component
{
  render() {
    return (
      <div className="chart">
        <svg ref="svg"></svg>
      </div>
    );
  }
  componentDidMount() {
    this.dataset();
  }

  componentWillUnmount() {
  }

  componentDidUpdate() {
    this.dataset();
  }

  dataset() {
    let {data, selected} = this.props
    if (!selected || !selected.children) {
      selected = data;
    }
    let experiences = map(selected.children, row => {
      return {
        label: row.name,
        value: row.experience,
      }
    })
    let interests = map(selected.children, row => {
      return {
        label: row.name,
        value: row.interest,
      }
    })
    experiences = sortBy(experiences, row => -row.value)
    this.update([
      {
        key: '経験',
        color: "#d67777",
        values: experiences,
      },
      {
        key: '興味',
        color: "#7777d6",
        values: interests,
      },
    ])
  }

  update(data) {
    var chart = nv.models.multiBarHorizontalChart();
    chart
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .margin({top: 30, right: 20, bottom: 30, left: 100})
      .showValues(false)
      .showControls(false)
      .tooltip.enabled(false)
    chart
      .yAxis.tickFormat(d3.format(',.2f'));
    d3.select(React.findDOMNode(this.refs.svg))
      .datum(data)
      .call(chart)
      .selectAll('.nv-bar')
        .on('click', (d) => {
          const {data, selected, onSelect} = this.props;
          if (selected && selected.children) {
            for (const row of selected.children) {
              if (d.label == row.name && row.children) {
                return onSelect(row);
              }
            }
          }
          onSelect(data);
        })
    nv.utils.windowResize(chart.update);
  }
}

export default Chart;
