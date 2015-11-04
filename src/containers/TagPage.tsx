import * as React from 'react'
import {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import TagCloudCanvas from 'components/TagCloudCanvas'
import {clone} from 'lodash'

interface Props {
  data: Object
  params: {[index: string]: string}
}

@connect(
  state => clone(state.tag)
)

export default class TagCloudContainer extends Component<Props, any>
{
  render() {
    const {data} = this.props
    const {mode} = this.props.params
    return (
      <div className="tagCloudContainer">
        <TagCloudCanvas data={data} mode={mode} />
      </div>
    )
  }
}
