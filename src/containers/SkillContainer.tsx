import Skill from 'domains/Skill'
import SkillNode from 'domains/SkillNode'
import ChartValue from 'domains/ChartValue'
import ChartData from 'domains/ChartData'
import ChartDataFactory from 'domains/ChartDataFactory'
import SkillCloudCanvas from 'components/SkillCloudCanvas'
import ChartCanvas from 'components/ChartCanvas'
import CommentCanvas from 'components/CommentCanvas'
import * as SkillConst from 'constants/SkillConst'
import * as Actions from 'actions/skill'
import * as React from 'react'
import {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {clone} from 'lodash'

interface Props {
  selected: Skill
  select: (skill: Skill)=>Object
}

@connect(
  state => clone(state.skill),
  dispatch => bindActionCreators(Actions, dispatch)
)

export default class SkillContainer extends Component<Props, any>
{
  render() {
    const {selected} = this.props
    const node = SkillConst.rootCloud.findNodeBySkill(selected)
    const data: ChartData = (()=>{
      if (selected) {
        return ChartDataFactory.createBySkillList(selected.children)
      } else {
        return null
      }
    })()
    const comment = (()=>{
      if (selected) {
        return selected.comment
      } else {
        return "Initializing..."
      }
    })()
    return (
      <div className="layout-skill">
        <SkillCloudCanvas
          cloud={SkillConst.rootCloud}
          selected={node}
          onSelect={skill => this.onSelectCloud(skill)} />
        <ChartCanvas
          data={data}
          root={SkillConst.rootChart}
          onSelect={value => this.onSelectChart(value)} />
        <CommentCanvas
          title={selected? selected.name: ''}
          comment={comment} />
        <div className="module-description">
          <p>
            <i className="fa fa-pencil-square-o"></i>
            スキル名のクリックで更に詳細が見れます。
          </p>
        </div>
      </div>
    )
  }

  onSelectCloud(skill: Skill) {
    if (!skill || skill.hasChildren) {
      const {select} = this.props
      select(skill)
    }
  }

  onSelectChart(value: ChartValue) {
    const {select} = this.props
    select(value.source)
  }
}