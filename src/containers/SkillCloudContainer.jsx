import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import SkillCloudCanvas from 'components/SkillCloudCanvas'
import ChartCanvas from 'components/ChartCanvas'
import CommentCanvas from 'components/CommentCanvas'
import * as Actions from '../actions/app'

@connect(
  state => {
    const  {cloud, comment, selected} = state.skill
    return {cloud, comment, selected}
  },
  dispatch => bindActionCreators(Actions, dispatch)
)
export default class SkillCloudContainer extends Component
{
  render() {
    const {cloud, comment, selected, select} = this.props
    return (
      <div className="skillCloudContainer">
        <SkillCloudCanvas cloud={cloud} selected={selected} onSelect={select} />
        <ChartCanvas cloud={cloud} selected={selected} onSelect={select} />
        <CommentCanvas  comment={comment} />
      </div>
    )
  }
}
