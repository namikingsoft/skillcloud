import * as React from 'react'
import {Component, PropTypes} from 'react'
import Test2 from 'components/test2'

export default class Test1 extends Component<any, any>
{
  render() {
    return (
      <p>
        <Test2 />
      </p>
    )
  }
}
