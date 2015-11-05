import ChartData from 'domains/ChartData'
import ChartValue from 'domains/ChartValue'
import * as React from 'react'
import {Component, PropTypes} from 'react'
import {sortBy} from 'lodash'

const d3 = require('d3')
const nv = require('nvd3/build/nv.d3')

export default class ChartDrawer
{
  private svg: any
  private chart: any
  private click: (d: ChartValue)=>void

  constructor(svgElement: any) {
    this.svg = d3.select(svgElement)
    this.chart = nv.models.multiBarHorizontalChart();
    this.chart
    .x(function(d) { return d.label })
    .y(function(d) { return d.value })
    .margin({top: 30, right: 20, bottom: 30, left: 100})
    .showValues(false)
    .showControls(false)
    .tooltip.enabled(false)
    this.chart
    .yAxis.tickFormat(d3.format(',.2f'));
    this.click = ()=>{}
  }

  onClick(click: (d: ChartValue)=>void): ChartDrawer {
    this.click = click
    return this
  }

  update(data: ChartData): ChartDrawer {
    this.svg
    .datum(data.forNVD3)
    .call(this.chart)
    .selectAll('.nv-bar')
    .on('click', d => this.click(d))
    nv.utils.windowResize(this.chart.update);

    return this
  }
}
