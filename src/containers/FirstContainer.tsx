import CrossHair from 'components/CrossHair'
import CommentCanvas from 'components/CommentCanvas'
import * as Action from 'actions/Action'
import * as React from 'react'
import {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

interface Props {
  moveBackground: (x: number, y: number)=>Object
  flashBackground: (timeout: number)=>Object
  moveCrossHair: (x: number, y: number, timeout: number)=>Object
  opacityCrossHair: (opacity: number, timeout: number)=>Object
}

interface State {
  transition?: string
  transform?: string
  transformOrigin?: string
}

@connect(
  null,
  dispatch => bindActionCreators(Action, dispatch)
)

export default class First extends Component<Props, State>
{
  render() {
    return (
      <div className="layout-first">
        <CommentCanvas
          title="はじめに"
          comment={
            "今までの業務経験や自己学習で得た技術スキルを" +
            "視覚的に表現するデモアプリです。" +
            "\n\n" +
            "※ PCでの最適化されております。" +
            "スマートフォン端末では、正しく動作しない恐れがありますので、" +
            "ご了承ください。"
          }
        />
        <div className="module-profile" ref="profile" style={this.state}>
          <div className="module-profile__position">
            Front-end Engineer
          </div>
          <div className="module-profile__name">
            並木　翼
          </div>
          <div className="module-profile__roman">
            Tsubasa Namiki
          </div>
          <div className="module-profile__avator">
            <img src="https://s.gravatar.com/avatar/3706c1a344dc2282c6683b6c6d0926f2?s=200" />
            <p>
              <i className="fa fa-copyright"></i> namikingsoft
            </p>
          </div>
          <div className="module-profile__link">
            <ul>
              <li><a href="https://github.com/namikingsoft"><i className="fa fa-github"></i> GitHub</a></li>
              <li><a href="https://github.com/namikingsoft"><i className="fa fa-twitter"></i> Twitter</a></li>
              <li><a href="http://blog.namiking.net"><i className="fa fa-home"></i> Blog</a></li>
            </ul>
          </div>
          <div className="module-profile__overview">
            <h4>徹底的に試行錯誤する</h4>
            <p>
              時間の限り、ぶっ壊して、作って、ぶっ壊して、作る。
            </p>
            <h4>ガキの心を忘れない</h4>
            <p>
              年を重ねても、アブノーマルな何かを作り続けたい。
            </p>
          </div>
          <div className="module-profile__forkme">
            <a href="https://github.com/namikingsoft/skillcloud">
              Fork me on GitHub
            </a>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const {
      moveBackground,
      flashBackground,
      moveCrossHair,
      opacityCrossHair
    } = this.props

    new Promise((resolve, reject) => {
      moveBackground(150, 100)
      moveCrossHair(window.innerWidth, 0, 0)
      setTimeout(resolve, 500)
    }).
    then(() => new Promise((resolve, reject) => {
      moveBackground(150, 100)
      opacityCrossHair(0.35, 200)
      setTimeout(resolve, 200)
    })).
    then(() => new Promise((resolve, reject) => {
      moveBackground(150, 100)
      moveCrossHair(0, 0, 750)
      setTimeout(resolve, 750)
    })).
    then(() => new Promise((resolve, reject) => {
      moveBackground(150, 100)
      moveCrossHair(0, window.innerHeight, 750)
      setTimeout(resolve, 750)
    })).
    then(() => new Promise((resolve, reject) => {
      moveBackground(150, 100)
      moveCrossHair(window.innerWidth-108, 105, 1000)
      setTimeout(resolve, 1100)
    })).
    then(() => new Promise((resolve, reject) => {
      moveBackground(-150, 100)
      flashBackground(0)
      opacityCrossHair(1.0, 500)
      setTimeout(resolve, 200)
    })).
    then(() => new Promise((resolve, reject) => {
      opacityCrossHair(0.0, 500)
    }))
  }

  componentWillUnmount() {
    const {moveCrossHair, opacityCrossHair} = this.props
    moveCrossHair(0, 0, 0)
    opacityCrossHair(0, 0)
  }
}
