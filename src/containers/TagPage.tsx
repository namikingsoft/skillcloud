import TagCloud from 'domains/TagCloud'
import TagCloudCanvas from 'components/TagCloudCanvas'
import * as React from 'react'
import {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {clone} from 'lodash'

interface Props {
  cloud: TagCloud
  params: {[index: string]: string}
}

@connect(
  state => clone(state.tag)
)

export default class TagPage extends Component<Props, any>
{
  render() {
    const {cloud} = this.props
    const {mode} = this.props.params
    return (
      <div className="tagCloudContainer">
        <TagCloudCanvas cloud={cloud} mode={mode} />
      </div>
    )
  }
}
