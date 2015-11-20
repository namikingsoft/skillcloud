import * as React from 'react'
import {Component, PropTypes} from 'react'
import {Link} from 'react-router'

export default class Navigation extends Component<any, any>
{
  render() {
    return (
      <div className="module-navigation">
        <Link to="/" activeClassName="active">
          <dl>
            <dt>01</dt>
            <dd>はじめに</dd>
          </dl>
        </Link>
        <Link to="/skill" activeClassName="active">
          <dl>
            <dt>02</dt>
            <dd>スキルクラウド</dd>
          </dl>
        </Link>
        <Link to="/tag/experience" activeClassName="active">
          <dl>
            <dt>03</dt>
            <dd>経験のある技術</dd>
          </dl>
        </Link>
        <Link to="/tag/interest" activeClassName="active">
          <dl>
            <dt>04</dt>
            <dd>興味のある技術</dd>
          </dl>
        </Link>
      </div>
    )
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidUpdate() {
  }
}
