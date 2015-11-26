import * as React from 'react'
import {Component, PropTypes} from 'react'

export default class Navigation extends Component<any, any>
{
  render() {
    return (
      <div className="module-copyright">
        <small>
          <p>
            Powered By <a href="#">React</a>, <a href="#">Redux</a>
          </p>
          <p>
            <i className="fa fa-pie-chart"></i><a href="#">d3.js</a>
            <i className="fa fa-align-left"></i><a href="#">NVD3</a>
            &nbsp; and more
          </p>
        </small>
      </div>
    )
  }
}
