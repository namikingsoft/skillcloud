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
              <li><i className="fa fa-github"></i> GitHub</li>
              <li><i className="fa fa-twitter"></i> Twitter</li>
              <li><i className="fa fa-home"></i> Blog</li>
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
            <a href="#">
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
      this.setState({
        transition: "0.5s linear",
        transform: "scale(6)",
        transformOrigin: "0 340px",
      })
      setTimeout(resolve, 200)
    }).
    then(() => new Promise((resolve, reject) => {
      this.setState({
        transition: "1.5s",
        transform: "scale(6) translate(-300px, 0px)",
        transformOrigin: "0 340px",
      })
      opacityCrossHair(0.4, 0)
      moveCrossHair(window.innerWidth/4*3, window.innerHeight/4, 500)
      moveBackground(-100, -100)
      setTimeout(resolve, 500)
    })).
    then(() => new Promise((resolve, reject) => {
      moveCrossHair(window.innerWidth/4, window.innerHeight/4*3, 500)
      moveBackground(-100, 0)
      setTimeout(resolve, 500)
    })).
    then(() => new Promise((resolve, reject) => {
      moveCrossHair(window.innerWidth, window.innerHeight, 500)
      setTimeout(resolve, 200)
    })).
    then(() => new Promise((resolve, reject) => {
      this.setState({
        transition: "0.2s",
        transform: "scale(1)",
      })
      flashBackground(0)
      setTimeout(resolve, 200)
    })).
    then(() => new Promise((resolve, reject) => {
      opacityCrossHair(0, 0)
      moveBackground(-100, 100)
    }))
  }

  componentWillUnmount() {
    const {moveCrossHair, opacityCrossHair} = this.props
    moveCrossHair(0, 0, 0)
    opacityCrossHair(0, 0)
  }
}
