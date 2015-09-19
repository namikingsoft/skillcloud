import React, { Component, PropTypes } from 'react';
import d3 from 'd3';
import nv from 'nvd3/build/nv.d3';

export
class HorChart extends Component {
  componentDidMount() {
    let data = [
      {
        "key": "日本語",
        "color": "#d67777",
        "values": [
          {
            "label" : "Group A" ,
            "value" : 1.8746444827653
          },
          {
            "label" : "Group B" ,
            "value" : 8.0961543492239
          },
          {
            "label" : "Group C" ,
            "value" : 0.57072943117674
          },
        ],
      },
    ];
    var chart = nv.models.multiBarHorizontalChart();
    chart
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .margin({top: 30, right: 20, bottom: 50, left: 175})
      .showValues(true)
      .tooltips(true)
      .showControls(false);
    chart
      .yAxis.tickFormat(d3.format(',.2f'));
    d3.select(React.findDOMNode(this.refs.svg))
      .datum(data)
      .call(chart);
    nv.utils.windowResize(chart.update);
  }

  render() {
    return (
      <div className="chart">
        <svg ref="svg"></svg>
      </div>
    );
  }
}
