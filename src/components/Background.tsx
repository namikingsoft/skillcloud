import * as React from 'react'
import {Component, PropTypes} from 'react'

interface State {
  x: number
  y: number
}

export default class Background extends Component<any, State>
{
  private dx: number
  private dy: number
  constructor() {
    super()
    this.state = {
      x: 0,
      y: 0,
    }
    this.dx = this.dy = 0
  }

  render() {
    return (
      <div className="module-background" style={{
        backgroundPosition: `${this.state.x}px ${this.state.y}px`,
      }}></div>
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
        x: this.state.x - this.dy,
        y: this.state.y - this.dx,
      })
      this.dx = this.dy = 0
    }
  }
}
