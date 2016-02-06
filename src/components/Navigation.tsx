import Handle from 'components/Handle'
import * as React from 'react'
import {Component, PropTypes} from 'react'
import {Link} from 'react-router'

export default class Navigation extends Component<any, any>
{
  render() {
    return (
      <div className="module-navigation">
        <Link to="/cloud" activeClassName="active">
          <dl>
            <dt>01</dt>
            <dd>スキルクラウド</dd>
          </dl>
        </Link>
        <Link to={encodeURI('/cloud/skill/Web系開発')} activeClassName="active">
          <dl>
            <dt>02</dt>
            <dd>Web系開発</dd>
          </dl>
        </Link>
        <Link to={encodeURI('/cloud/skill/インフラ構築')} activeClassName="active">
          <dl>
            <dt>03</dt>
            <dd>インフラ構築</dd>
          </dl>
        </Link>
        <Link to={encodeURI('/cloud/skill/データベース')} activeClassName="active">
          <dl>
            <dt>04</dt>
            <dd>データベース</dd>
          </dl>
        </Link>
        <Link to={encodeURI('/cloud/skill/アプリ開発')} activeClassName="active">
          <dl>
            <dt>05</dt>
            <dd>アプリ開発</dd>
          </dl>
        </Link>
        <Link to={encodeURI('/cloud/skill/マネジメント')} activeClassName="active">
          <dl>
            <dt>06</dt>
            <dd>マネジメント</dd>
          </dl>
        </Link>
        <Link to="/cloud/tag/experience" activeClassName="active">
          <dl>
            <dt>07</dt>
            <dd>経験のある技術</dd>
          </dl>
        </Link>
        <Link to="/cloud/tag/interest" activeClassName="active">
          <dl>
            <dt>08</dt>
            <dd>興味のある技術</dd>
          </dl>
        </Link>
        <Handle
          onNext={() => this.next()}
          onBack={() => this.back()}
          onIndex={index => this.toIndex(index)} />
      </div>
    )
  }

  next() {
    const nextIndex = this.currentIndex() + 1
    if (nextIndex < this.size()) {
      this.toIndex(nextIndex)
    } else {
      this.toTop()
    }
  }

  back() {
    const backIndex = this.currentIndex() - 1
    if (backIndex > 0) {
      this.toIndex(backIndex)
    } else {
      this.toTop()
    }
  }

  toIndex(index: number) {
    const thisElement = React.findDOMNode(this)
    const linkElements = thisElement.querySelectorAll('a')
    location.hash = linkElements[index].getAttribute('href')
  }

  toTop() {
    location.hash = '/'
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
      if (element.getAttribute('class') === 'active') {
        return i
      }
    }
    return -1
  }
}
