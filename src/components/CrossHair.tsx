import * as React from 'react'
import {Component, PropTypes} from 'react'

interface State {
  top?: number
  left?: number
  opacity?: number
}

export default class CrossHair extends Component<any, State>
{
  private dx: number
  private dy: number
  private timerId: any

  constructor() {
    super()
    this.state = {
      top: 0,
      left: 0,
      opacity: 0,
    }
    this.dx = this.dy = 0
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

  componentDidMount() {
    window.addEventListener('mousemove', e => this.mousemove(e))

  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', e => this.mousemove(e))
  }

  mousemove(e) {
    return
    if (e.buttons > 0) {
      // if press anything button
      this.dx += e.movementX
      this.dy += e.movementY
      const dist = Math.sqrt(this.dx*this.dx + this.dy*this.dy)
      if (dist > 50) {
        clearTimeout(this.timerId)
        this.dx = this.dy = 0
        this.setState({
          top: e.clientY,
          opacity: 0.4,
        })
        setTimeout(() => {
          this.setState({
            left: e.clientX,
          })
          this.timerId = setTimeout(() => {
            this.setState({
              opacity: 0,
            })
          }, 500)
        }, 500)
      }
    }
  }
}
