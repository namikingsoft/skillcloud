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
        <Link to="/skill/Web系開発" activeClassName="active">
          <dl>
            <dt>03</dt>
            <dd>Web系開発</dd>
          </dl>
        </Link>
        <Link to="/skill/インフラ構築" activeClassName="active">
          <dl>
            <dt>04</dt>
            <dd>インフラ構築</dd>
          </dl>
        </Link>
        <Link to="/skill/アプリ開発" activeClassName="active">
          <dl>
            <dt>05</dt>
            <dd>アプリ開発</dd>
          </dl>
        </Link>
        <Link to="/skill/趣味・特技" activeClassName="active">
          <dl>
            <dt>06</dt>
            <dd>趣味・特技</dd>
          </dl>
        </Link>
        <Link to="/tag/experience" activeClassName="active">
          <dl>
            <dt>07</dt>
            <dd>経験のある技術</dd>
          </dl>
        </Link>
        <Link to="/tag/interest" activeClassName="active">
          <dl>
            <dt>08</dt>
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
