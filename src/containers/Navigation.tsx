import Background from 'components/Background'
import * as React from 'react'
import {Component, PropTypes} from 'react'
import {Link} from 'react-router'

interface Props {
  children: Array<any>
}

export default class Navigation extends Component<Props, any>
{
  render() {
    return (
      <div>
        <Background />
        <div className="navigation">
          <h1><Link to="/">Skill Cloud</Link></h1>
          <ul>
            <li><Link to="/skill"><i className="fa fa-pie-chart"></i>Skill</Link></li>
            <li><Link to="/tag/experience"><i className="fa fa-tags"></i>Tags</Link></li>
          </ul>
        </div>
        <div className="content">
          {this.props.children}
        </div>
        <small className="copyright">
          Copyright 2015 <i className="fa fa-copyright"></i>namikingsoft
        </small>
      </div>
    )
  }
}
