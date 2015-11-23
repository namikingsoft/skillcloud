import Profile from 'components/Profile'
import CrossHair from 'components/CrossHair'
import CommentCanvas from 'components/CommentCanvas'
import * as React from 'react'
import {Component, PropTypes} from 'react'

export default class FirstContainer extends Component<any, any>
{
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
        <Profile />
        <CrossHair />
      </div>
    );
  }
}
