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
        <div className="navigation">
          <h1><Link to="/">Skill Cloud</Link></h1>
          <ul>
            <li><Link to="/skill">Skill</Link></li>
            <li><Link to="/tag/experience">Experience</Link></li>
            <li><Link to="/tag/interest">Interest</Link></li>
          </ul>
        </div>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}