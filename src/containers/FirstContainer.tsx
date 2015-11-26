import Profile from 'components/Profile'
import CrossHair from 'components/CrossHair'
import CommentCanvas from 'components/CommentCanvas'
import * as Action from 'actions/Action'
import * as React from 'react'
import {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

interface Props {
  flashBackground: (timeout: number)=>Object
  moveCrossHair: (x: number, y: number, timeout: number)=>Object
  opacityCrossHair: (opacity: number, timeout: number)=>Object
}

@connect(
  null,
  dispatch => bindActionCreators(Action, dispatch)
)

export default class FirstContainer extends Component<Props, any>
{
  private profile: Profile

  render() {
    return (
      <div className="layout-first">
        <CommentCanvas
          title="はじめに"
          comment={
            "ここにテキストが入ります。" +
            "ここにテキストが入ります。" +
            "ここにテキストが入ります。" +
            "ここにテキストが入ります。\n\n" +
            "ここにテキストが入ります。" +
            "ここにテキストが入ります。" +
            "ここにテキストが入ります。" +
            "ここにテキストが入ります。" +
            "ここにテキストが入ります。" +
            "ここにテキストが入ります。"
          }
        />
        <Profile ref={v => this.profile = v} />
      </div>
    );
  }

  componentDidMount() {
    const {flashBackground, moveCrossHair, opacityCrossHair} = this.props
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 1000)
    }).
    then(() => new Promise((resolve, reject) => {
      const rect = this.profile.rect
      moveCrossHair(rect.left, rect.top, 500)
      opacityCrossHair(0.5, 500)
      setTimeout(() => resolve(), 500)
    })).
    then(() => new Promise((resolve, reject) => {
      const rect = this.profile.rect
      moveCrossHair(rect.left + rect.width, rect.top + rect.height, 1000)
      setTimeout(() => resolve(), 1000)
    })).
    then(() => new Promise((resolve, reject) => {
      opacityCrossHair(0, 500)
      flashBackground(0)
    }))
  }

  componentWillUnmount() {
    const {moveCrossHair, opacityCrossHair} = this.props
    moveCrossHair(0, 0, 0)
    opacityCrossHair(0, 0)
  }
}
