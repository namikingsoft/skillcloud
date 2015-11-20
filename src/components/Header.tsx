import * as React from 'react'
import {Component, PropTypes} from 'react'
import {Link} from 'react-router'

export default class Navigation extends Component<any, any>
{
  render() {
    return (
      <div className="module-header">
        <h1><Link to="/">Skill Cloud</Link></h1>
        <p>
          <i className="fa fa-pencil-square-o"></i>
          スキル名のクリックで更に詳細が見れます。
        </p>
      </div>
    )
  }
}
