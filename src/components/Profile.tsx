import * as React from 'react'
import {Component, PropTypes} from 'react'

export default class ProfileContainer extends Component<any, any>
{
  render() {
    return (
      <div className="module-profile">
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
          <p>My Global Avator</p>
        </div>
        <div className="module-profile__link">
          <ul>
            <li><i className="fa fa-github"></i> GitHub</li>
            <li><i className="fa fa-twitter"></i> Twitter</li>
            <li><i className="fa fa-home"></i> Blog</li>
          </ul>
        </div>
        <div className="module-profile__overview">
          <h4>試行錯誤する</h4>
          <p>
            時間の限り、ぶっ壊して、作って、ぶっ壊して、作る。
          </p>
          <h4>許可を求めるな、謝罪せよ</h4>
          <p>
            見せたほうが早い。作る理由は、作ってから決める。
          </p>
        </div>
      </div>
    );
  }
}
