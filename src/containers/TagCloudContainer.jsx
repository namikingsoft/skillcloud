import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import TagCloudCanvas from 'components/TagCloudCanvas'
import * as Actions from '../actions/app'

@connect(
  state => {
    const  {data} = state.tag
    return {data}
  },
  dispatch => bindActionCreators(Actions, dispatch)
)
export default class TagCloudContainer extends Component
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
