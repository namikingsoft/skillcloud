import * as React from 'react'
import {Component, PropTypes} from 'react'

interface Props {
  ref: any
}

interface State {
  top: number
  left: number
  opacity: number
  timeout: number
}

export default class CrossHair extends Component<Props, State>
{
  constructor() {
    super()
    this.state = {
      top: 0,
      left: 0,
      opacity: 0,
      timeout: 0,
    }
  }

  render() {
    const {top, left, opacity,timeout} = this.state
    const transition =
      `all ${timeout/1000}s ease-in-out,` +
      `opacity ${timeout/1000}s linear`
    return (
      <div className="module-crosshair">
        <div className="line vertical" style={{left, opacity, transition}} />
        <div className="line horizontal" style={{top, opacity, transition}} />
      </div>
    )
  }

  move(left: number, top: number, timeout: number = 500) {
    const {opacity} = this.state
    this.setState({top, left, opacity, timeout})
  }

  opacity(opacity: number, timeout: number = 500) {
    const {top, left} = this.state
    this.setState({top, left, opacity, timeout})
  }
}
