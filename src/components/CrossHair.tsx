import * as React from 'react'
import {Component, PropTypes} from 'react'

interface Props {
  ref: any
}

interface State {
  top: number
  left: number
  opacity: number
}

export default class CrossHair extends Component<Props, State>
{
  constructor() {
    super()
    this.state = {
      top: 0,
      left: 0,
      opacity: 0,
    }
  }

  render() {
    const {top, left, opacity} = this.state
    return (
      <div className="module-crosshair">
        <div className="line vertical" style={{left, opacity}} />
        <div className="line horizontal" style={{top, opacity,}} />
      </div>
    )
  }

  move(left: number, top: number) {
    const {opacity} = this.state
    this.setState({top, left, opacity})
  }

  opacity(opacity: number) {
    const {top, left} = this.state
    this.setState({top, left, opacity})
  }
}
