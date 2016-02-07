import * as React from 'react'
import {Component, PropTypes} from 'react'

export default class Navigation extends Component<any, any>
{
  render() {
    return (
      <div className="module-copyright">
        <small>
          <p>
            Powered By <a href="https://github.com/facebook/react">React</a>, <a href="https://github.com/rackt/redux">Redux</a>
          </p>
          <p>
            <i className="fa fa-pie-chart"></i><a href="https://github.com/mbostock/d3">d3.js</a>
            <i className="fa fa-align-left"></i><a href="https://github.com/novus/nvd3">NVD3</a>
            &nbsp; and more
          </p>
        </small>
      </div>
    )
  }
}
