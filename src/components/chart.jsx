import React, { Component, PropTypes } from 'react';
import { sortBy } from 'lodash';
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
    const { selected } = this.props;
    const data = this.dataset(selected);
    this.update(data);
  }

  componentWillUnmount() {
  }

  componentDidUpdate() {
    const { selected } = this.props;
    const data = this.dataset(selected);
    this.update(data);
  }

  dataset(selected) {
    let subject = '';
    let values = [];
    if (selected && selected.rows) {
      subject = selected.name;
      for (const row of selected.rows) {
        values.push({
          label: row.name,
          value: row.score,
        });
      }
    } else {
      subject = "Profile";
      values = [
        {
          "label" : "Group A" ,
          "value" : 1.8746444827653,
        },
        {
          "label" : "Group B" ,
          "value" : 8.0961543492239,
        },
        {
          "label" : "Group C" ,
          "value" : 0.57072943117674,
        },
      ];
    }
    values = sortBy(values, row => -row.value);
    return [
      {
        key: '経験値',
        color: "#d67777",
        values,
      }
    ];
  }

  update(data) {
    var chart = nv.models.multiBarHorizontalChart();
    chart
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .margin({top: 30, right: 20, bottom: 30, left: 100})
      .showValues(false)
      .tooltips(true)
      .showControls(false);
    chart
      .yAxis.tickFormat(d3.format(',.2f'));
    d3.select(React.findDOMNode(this.refs.svg))
      .datum(data)
      .call(chart);
    nv.utils.windowResize(chart.update);
  }
}

export default Chart;
