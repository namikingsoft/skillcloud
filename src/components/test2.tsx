import * as React from 'react'
import {Component, PropTypes} from 'react'

interface Props {
  content?: string
}

export default class Test2 extends Component<Props, any>
{
  constructor(props: Props) {
    if (!props.content) props.content = 'test'
    super(props);
  }

  render() {
    return (
      <p>{this.props.content}</p>
    )
  }
}
