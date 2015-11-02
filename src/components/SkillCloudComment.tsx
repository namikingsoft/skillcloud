import * as React from 'react'
import {Component, PropTypes} from 'react'

interface Props {
  comment: string
}

export default class SkillCloudComment extends Component<Props, any>
{
  render() {
    const {comment} = this.props
    return (
      <div className="comment">
        <p>{comment}</p>
      </div>
    )
  }
}
