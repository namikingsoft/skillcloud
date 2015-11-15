import * as React from 'react'
import {Component, PropTypes} from 'react'

interface State {
  top?: number
  left?: number
  opacity?: number
}

export default class CrossHair extends Component<any, State>
{
  private mouseX: number
  private mouseY: number
  private mouseTimerId: any
  private opacityTimerId: any

  constructor() {
    super()
    this.state = {
      top: 0,
      left: 0,
      opacity: 0.2,
    }
    this.mouseX = this.mouseY = 0
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
    this.mouseTimerId = setInterval(() => {
      this.setState({
        top: this.mouseY,
        left: this.mouseX,
      })
    }, 500)
    this.opacityTimerId = setInterval(() => {
      this.setState({
        opacity: 0.8,
      })
      setTimeout(() => {
        this.setState({
          opacity: 0.2,
        })
      }, 1000)
    }, 4000)
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', e => this.mousemove(e))
    clearInterval(this.mouseTimerId)
    clearInterval(this.opacityTimerId)
  }

  mousemove(e) {
    this.mouseX = e.offsetX
    this.mouseY = e.offsetY
  }
}
