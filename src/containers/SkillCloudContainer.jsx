import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import SkillCloudCanvas from 'components/SkillCloudCanvas'
import SkillCloudChart from 'components/SkillCloudChart'
import SkillCloudComment from 'components/SkillCloudComment'
import * as Actions from '../actions/app'

@connect(
  state => {
    const  {cloud, comment, selected} = state.skill;
    return {cloud, comment, selected};
  },
  dispatch => bindActionCreators(Actions, dispatch)
)
export default class SkillCloudContainer extends Component
{
  render() {
    const {cloud, comment, selected, select} = this.props;
    return (
      <div className="skillCloudContainer">
        <SkillCloudCanvas cloud={cloud} selected={selected} onSelect={select} />
        <SkillCloudChart cloud={cloud} selected={selected} onSelect={select} />
        <SkillCloudComment comment={comment} />
      </div>
    )
  }
}
