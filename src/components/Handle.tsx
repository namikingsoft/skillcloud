import * as React from 'react'
import {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import match from 'match-case'

interface Props {
  onNext?: ()=>void
  onBack?: ()=>void
  onIndex?: (index: number)=>void
}

interface State {
  nextProgress: number
  backProgress: number
}

export default class Handle extends Component<Props, State>
{
  static SCROLL_THRESHOLD = 2000
  static SCROLL_RESET_MSEC = 250
  static LOCK_WHEEL_MSEC = 1000

  private timerId: any
  private isLockWheel: boolean

  constructor() {
    super()
    this.state = {
      nextProgress: 0,
      backProgress: 0,
    }
    this.isLockWheel = false
  }

  render() {
    const {nextProgress, backProgress} = this.state
    const nextY = window.innerHeight / Handle.SCROLL_THRESHOLD * nextProgress
    const backY = window.innerHeight / Handle.SCROLL_THRESHOLD * backProgress
    return (
      <div className="module-handle">
        <div className="module-handle__back" style={{
          marginBottom: -backY,
        }} />
        <div className="module-handle__next" style={{
          marginTop: -nextY,
        }} />
      </div>
    )
  }

  componentDidMount() {
    window.addEventListener('wheel', e => this.wheel(e))
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', e => this.wheel(e))
  }

  componentDidUpdate() {
    const {onNext, onBack} = this.props
    if (this.state.nextProgress > Handle.SCROLL_THRESHOLD) {
      if (onNext) onNext()
      this.setState({
        nextProgress: 0,
        backProgress: 0,
      })
      this.lockWheelLittle()
    }
    if (this.state.backProgress > Handle.SCROLL_THRESHOLD) {
      if (onBack) onBack()
      this.setState({
        nextProgress: 0,
        backProgress: 0,
      })
      this.lockWheelLittle()
    }
  }

  wheel(e) {
    if (this.isLockWheel) return

    match<number, any>(e.deltaY).
      caseOf(n => n > 0, v => this.setState({
        nextProgress: this.state.nextProgress + e.deltaY,
        backProgress: this.state.backProgress - e.deltaY,
      })).
      caseOf(n => n < 0, v => this.setState({
        nextProgress: this.state.nextProgress + e.deltaY,
        backProgress: this.state.backProgress - e.deltaY,
      })).
    end()

    // reset state
    clearTimeout(this.timerId)
    this.timerId = setTimeout(() => this.setState({
      nextProgress: 0,
      backProgress: 0,
    }), Handle.SCROLL_RESET_MSEC)
  }

  lockWheelLittle() {
    this.isLockWheel = true
    setTimeout(() => this.isLockWheel = false, Handle.LOCK_WHEEL_MSEC)
  }
}
