import Background from 'components/Background'
import CrossHair from 'components/CrossHair'
import * as Action from 'actions/Action'
import * as React from 'react'
import {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {clone} from 'lodash'

interface Props {
  background?: {
    x: number,
    y: number,
    timeout: number,
    seqMove: number,
    seqFlash: number,
  },
  crosshair?: {
    x: number,
    y: number,
    opacity: number,
    timeout: number,
  },
}

@connect(
  state => new Object({
    background: clone(state.background),
    crosshair: clone(state.crosshair),
  })
)

export default class Base extends Component<Props, any>
{
  private background: Background
  private crosshair: CrossHair

  render() {
    return (
      <div className="layout-decoration">
        <Background ref={v => this.background = v} />
        <CrossHair ref={v => this.crosshair = v} />
      </div>
    )
  }

  componentDidUpdate(prevProps: Props) {
    const {background, crosshair} = this.props
    const {x, y, opacity, timeout} = crosshair
    if (background.seqMove !== prevProps.background.seqMove) {
      this.background.move(background.x, background.y)
    }
    if (background.seqFlash !== prevProps.background.seqFlash) {
      setTimeout(() => this.background.flash(), background.timeout)
    }
    if (x !== prevProps.crosshair.x || y !== prevProps.crosshair.y) {
      this.crosshair.move(x, y, timeout)
    }
    if (opacity !== prevProps.crosshair.opacity) {
      this.crosshair.opacity(opacity, timeout)
    }
  }
}
