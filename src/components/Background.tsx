import * as React from 'react'
import {Component, PropTypes} from 'react'

interface Props {
  ref: any
}

interface State {
  x: number
  y: number
  opacity: number
}

export default class Background extends Component<Props, State>
{
  private dx: number
  private dy: number

  constructor() {
    super()
    this.state = {
      x: 0,
      y: 0,
      opacity: 0.06,
    }
    this.dx = this.dy = 0
  }

  render() {
    return (
      <div className="module-background" style={{
        backgroundPosition: `${this.state.x}px ${this.state.y}px`,
        opacity: this.state.opacity,
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
    if (e.buttons > 0) {
      // if press anything button
      this.dx += e.movementX
      this.dy += e.movementY
      const dist = Math.sqrt(this.dx*this.dx + this.dy*this.dy)
      if (dist > 44) {
        this.setState({
          x: this.state.x - this.dx,
          y: this.state.y - this.dy,
          opacity: this.state.opacity,
        })
        this.dx = this.dy = 0
      }
    }
    else {
      this.dx = this.dy = 0
    }
  }

  flash() {
    this.setState({
      x: this.state.x,
      y: this.state.y,
      opacity: 0.25,
    })
    setTimeout(() => this.setState({
      x: this.state.x,
      y: this.state.y,
      opacity: 0.06,
    }), 250)
  }
}
