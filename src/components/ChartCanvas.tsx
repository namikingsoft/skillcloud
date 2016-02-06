import ChartData from 'domains/ChartData'
import ChartDrawer from 'components/service/ChartDrawer'
import * as React from 'react'
import {Component, PropTypes} from 'react'

const d3 = require('d3')
const nv = require('nvd3/build/nv.d3')

interface Props {
  data: ChartData
  onClick?: Function
}

export default class ChartCanvas extends Component<Props, any>
{
  private drawer: ChartDrawer

  render() {
    const {data} = this.props
    const style = {opacity: data? 1 : 0}
    return (
      <div className="module-chart" style={style}>
        <svg ref="svg"></svg>
      </div>
    )
  }

  componentDidMount() {
    this.drawer = new ChartDrawer(
      React.findDOMNode(this.refs['svg'])
    )
    .onClick(value => this.props.onClick(value))

    const {data} = this.props
    if (data) {
      this.drawer.update(this.props.data)
    }
  }

  componentWillUnmount() {
  }

  componentDidUpdate() {
    const {data} = this.props
    if (data) {
      this.drawer.update(this.props.data)
    }
  }
}
