import * as React from 'react'
import {Component, PropTypes} from 'react'

interface Props {
  className?: string
  timeByShow?: number
  children?: Component<any, any>[]
}

interface State {
  opacity?: number
}

export default class PleaseScroll extends Component<Props, State>
{
  constructor() {
    super()
    this.state = {opacity: 0}
  }

  render() {
    const {className} = this.props
    return (
      <div className={"module-please " + className} style={this.state}>
        {this.props.children}
      </div>
    )
  }

  componentDidMount() {
    const timeByShow = this.props.timeByShow || 1500
    setTimeout(() => this.setState({opacity: 1}), timeByShow)
    this.setState({opacity: 0})
  }
}
