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
    window.addEventListener('mousemove', this.mousemove)
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.mousemove)
  }

  // @todo messy
  private prevX
  private prevY
  private mousemove = e => {
    const movementX = (this.prevX!==undefined) ? e.pageX - this.prevX : 0
    const movementY = (this.prevY!==undefined) ? e.pageY - this.prevY : 0
    this.prevX = e.pageX
    this.prevY = e.pageY
    if (this.isClicked(e)) {
    console.log(movementX)
      this.dx += movementX
      this.dy += movementY
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

  move(x: number, y: number) {
    this.setState({
      x: this.state.x + x,
      y: this.state.y + y,
      opacity: this.state.opacity,
    })
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

  private isClicked(e) {
    return e.buttons || e.which
  }
}
