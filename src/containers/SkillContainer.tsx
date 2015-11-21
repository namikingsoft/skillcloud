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
import match from 'match-case'

interface Props {
  selected: Skill
  displayed: Skill
  select: (skill: Skill)=>Object
  display: (skill: Skill)=>Object
  params: {[index: string]: string}
}

@connect(
  state => clone(state.skill),
  dispatch => bindActionCreators(Actions, dispatch)
)

export default class SkillContainer extends Component<Props, any>
{
  render() {
    const {selected, displayed} = this.props
    const cloud = SkillConst.rootCloud
    const node = cloud.findNodeBySkill(selected)
    const data: ChartData = selected?
      ChartDataFactory.createBySkillList(selected.children) : null

    return (
      <div className="layout-skill">
        <SkillCloudCanvas
          cloud={cloud}
          selected={node}
          onRide={skill => this.ride(skill)}
          onDown={skill => this.ride(null)} />
        <ChartCanvas
          data={data}
          root={SkillConst.rootChart} />
        <CommentCanvas
          title={this.title}
          comment={this.comment} />
      </div>
    )
  }

  componentDidMount() {
    const {action} = this.props.params
    this.selectByName(action)
  }

  componentWillUnmount() {
    // @todo messy
    const {select} = this.props
    select(SkillConst.initialSkill)
  }

  componentDidUpdate(prevProps: Props = null) {
    const {action} = this.props.params
    if (action === prevProps.params['action']) return
    this.selectByName(action)
  }

  selectByName(name: string) {
    const node = SkillConst.rootCloud.findNodeByName(name)
    const skill = node? node.skill : null
    this.selectBySkill(skill)
  }

  selectBySkill(skill: Skill) {
    if (!skill || skill.hasChildren) {
      const {select} = this.props
      select(skill)
    }
  }

  ride(skill: Skill) {
    if (!skill || skill.hasChildren) {
      const {display} = this.props
      display(skill)
    }
  }

  private get title(): string {
    const {selected, displayed} = this.props
    return match<Skill, string>(displayed).
      caseOfNone(
        match<Skill, string>(selected).
          caseOfNone(SkillConst.rootCloud.rootNode.skill.name).
          caseOfElse(skill => skill.name).
        end()
      ).
      caseOfElse(skill => skill.name).
    end()
  }

  private get comment(): string {
    const {selected, displayed} = this.props
    return match<Skill, string>(displayed).
      caseOfNone(
        match<Skill, string>(selected).
          caseOfNone(SkillConst.rootCloud.rootNode.skill.comment).
          caseOfElse(skill => skill.comment).
        end()
      ).
      caseOfElse(skill => skill.comment).
    end()
  }
}
