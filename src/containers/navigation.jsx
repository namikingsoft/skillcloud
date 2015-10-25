import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router'

export default class Navigation extends Component
{
  render() {
    return (
      <div>
        <div className="navigation">
          <h1><Link to="/">Skill Cloud</Link></h1>
          <ul>
            <li><Link to="/">Skill</Link></li>
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
