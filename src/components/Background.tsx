import * as React from 'react'
import {Component, PropTypes} from 'react'

interface State {
  top: number
  left: number
}

export default class Background extends Component<any, State>
{
  private dx: number
  private dy: number
  constructor() {
    super()
    this.state = {
      top: -2000,
      left: -2000,
    }
    this.dx = this.dy = 0
  }

  render() {
    return (
      <div className="module-background" style={this.state}></div>
    )
  }

  componentDidMount() {
    window.addEventListener('mousemove', e => this.mousemove(e))
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', e => this.mousemove(e))
  }

  mousemove(e) {
    this.dx += e.movementX
    this.dy += e.movementY
    const dist = Math.sqrt(this.dx*this.dx + this.dy*this.dy)
    if (dist > 44) {
      this.setState({
        top: this.state.top - this.dy,
        left: this.state.left - this.dx,
      })
      this.dx = this.dy = 0
    }
  }
}
