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

interface State {
  isDisplay?: boolean
}

export default class ChartCanvas extends Component<Props, State>
{
  private drawer: ChartDrawer

  render() {
    return (
      <div className="module-chart">
        <svg ref="svg"></svg>
      </div>
    )
  }

  componentDidMount() {
    this.drawer = new ChartDrawer(
      React.findDOMNode(this.refs['svg'])
    )
    .onClick(value => this.props.onClick(value))
    .update(this.props.data)
  }

  componentWillUnmount() {
  }

  componentDidUpdate() {
    this.drawer.update(this.props.data)
  }
}
