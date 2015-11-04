import SkillCloud from 'domains/SkillCloud'
import SkillNode from 'domains/SkillNode'
import SkillCloudCanvas from 'components/SkillCloudCanvas'
import ChartCanvas from 'components/ChartCanvas'
import CommentCanvas from 'components/CommentCanvas'
import * as Actions from '../actions/SkillAction'
import * as React from 'react'
import {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {clone} from 'lodash'

interface Props {
  cloud: SkillCloud
  comment: string
  selected: SkillNode
  select: (node: SkillNode)=>Object
}

@connect(
  state => clone(state.skill),
  dispatch => bindActionCreators(Actions, dispatch)
)

export default class SkillCloudContainer extends Component<Props, any>
{
  render() {
    const {cloud, comment, selected, select} = this.props
    return (
      <div className="skillCloudContainer">
        <SkillCloudCanvas cloud={cloud} selected={selected} onSelect={select} />
        <ChartCanvas cloud={cloud} selected={selected} onSelect={select} />
        <CommentCanvas comment={comment} />
      </div>
    )
  }
}
