import * as React from 'react'
import {Component, PropTypes} from 'react'

export default class Navigation extends Component<any, any>
{
  render() {
    return (
      <div className="module-copyright">
        <small>
          <p>Copyright 2015 <i className="fa fa-copyright"></i>namikingsoft</p>
          <p>Powered By <a href="#">React</a>, <a href="#">Redux</a></p>
          <ul>
            <li><i className="fa fa-pie-chart"></i><a href="#">d3.js</a></li>
            <li><i className="fa fa-align-left"></i><a href="#">NVD3</a></li>
            <li>and more</li>
          </ul>
        </small>
      </div>
    )
  }
}
