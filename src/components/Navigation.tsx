import Handle from 'components/Handle'
import * as React from 'react'
import {Component, PropTypes} from 'react'
import {Link} from 'react-router'

export default class Navigation extends Component<any, any>
{
  render() {
    return (
      <div className="module-navigation">
        <Link to="/" ref="link1" activeClassName="active">
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
        <Handle
          onNext={() => this.next()}
          onBack={() => this.back()}
          onIndex={index => this.index(index)} />
      </div>
    )
  }

  next() {
    const currentIndex = this.currentIndex()
    if (currentIndex < this.size()) {
      this.index(currentIndex + 1)
    }
  }

  back() {
    const currentIndex = this.currentIndex()
    if (currentIndex > 0) {
      this.index(currentIndex - 1)
    }
  }

  index(index: number) {
    const thisElement = React.findDOMNode(this)
    const linkElements = thisElement.querySelectorAll('a')
    location.hash = linkElements[index].getAttribute('href')
  }

  size(): number {
    const thisElement = React.findDOMNode(this)
    const linkElements = thisElement.querySelectorAll('a')
    return linkElements.length
  }

  currentIndex(): number {
    const thisElement = React.findDOMNode(this)
    const linkElements = thisElement.querySelectorAll('a')
    for (let i=0; i<linkElements.length; i++) {
      const element = linkElements[i]
      if (element.getAttribute('class') === 'active') return i
    }
    return 0
  }
}
