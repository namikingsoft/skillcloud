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
  static SCROLL_THRESHOLD = 1755
  static SCROLL_RESET_MSEC = 250
  static LOCK_WHEEL_MSEC = 1000

  static KEYCODE_LEFT = 37
  static KEYCODE_UP = 38
  static KEYCODE_RIGHT = 39
  static KEYCODE_DOWN = 40
  static KEYCODE_1 = 49
  static KEYCODE_TENKEY_1 = 97

  private timerId: any
  private isLockWheel: boolean

  constructor() {
    super()
    this.isLockWheel = false
    this.state = {
      nextProgress: 0,
      backProgress: 0,
    }
  }

  render() {
    const {nextProgress, backProgress} = this.state
    const nextY = window.innerHeight / Handle.SCROLL_THRESHOLD * nextProgress
    const backY = window.innerHeight / Handle.SCROLL_THRESHOLD * backProgress
    const nextPer = nextProgress / Handle.SCROLL_THRESHOLD
    const backPer = backProgress / Handle.SCROLL_THRESHOLD
    return (
      <div className="module-handle">
        <div className="module-handle__back" style={{
          marginBottom: -backY,
        }}>
          <p style={{left: -backPer*300+150, opacity: backPer-0.3}}>
            <i className="fa fa-arrow-circle-o-left"></i> Back
          </p>
        </div>
        <div className="module-handle__next" style={{
          marginTop: -nextY,
        }}>
          <p style={{left: nextPer*300-150, opacity: nextPer-0.3}}>
            Next <i className="fa fa-arrow-circle-o-right"></i>
          </p>
        </div>
      </div>
    )
  }

  componentDidMount() {
    window.addEventListener('wheel', e => this.wheel(e))
    window.addEventListener('keyup', e => this.keyup(e))
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', e => this.wheel(e))
    window.removeEventListener('keyup', e => this.keyup(e))
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

  lockWheelLittle() {
    this.isLockWheel = true
    setTimeout(() => this.isLockWheel = false, Handle.LOCK_WHEEL_MSEC)
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

  keyup(e) {
    match<number, any>(e.keyCode).
      caseOf(n => n === Handle.KEYCODE_LEFT, v => this.onBack()).
      caseOf(n => n === Handle.KEYCODE_UP, v => this.onBack()).
      caseOf(n => n === Handle.KEYCODE_RIGHT, v => this.onNext()).
      caseOf(n => n === Handle.KEYCODE_DOWN, v => this.onNext()).
      caseOf(
        n => Handle.KEYCODE_1 <= n&&n <= Handle.KEYCODE_1+9,
        v => this.onIndex(v - Handle.KEYCODE_1)
      ).
      caseOf(
        n => Handle.KEYCODE_TENKEY_1 <= n&&n <= Handle.KEYCODE_TENKEY_1+9,
        v => this.onIndex(v - Handle.KEYCODE_TENKEY_1)
      ).
    end()
  }

  onNext() {
    const {onNext} = this.props
    if (onNext) onNext()
  }

  onBack() {
    const {onBack} = this.props
    if (onBack) onBack()
  }

  onIndex(index: number) {
    const {onIndex} = this.props
    if (onIndex) onIndex(index)
  }
}
