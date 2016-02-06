import Skill from 'domains/Skill'
import SkillNode from 'domains/SkillNode'
import ChartValue from 'domains/ChartValue'
import ChartData from 'domains/ChartData'
import ChartDataFactory from 'domains/ChartDataFactory'
import SkillCloudCanvas from 'components/SkillCloudCanvas'
import ChartCanvas from 'components/ChartCanvas'
import CommentCanvas from 'components/CommentCanvas'
import * as SkillConst from 'constants/SkillConst'
import * as Action from 'actions/Action'
import * as React from 'react'
import {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {clone} from 'lodash'
import match from 'match-case'

interface Props {
  skill: {
    selected: Skill,
    displayed: Skill,
  }
  zoom: {
    percent: number,
  }
  selectSkill: (skill: Skill)=>Object
  displaySkill: (skill: Skill)=>Object
  params: {[index: string]: string}
}

@connect(
  state => new Object({
    skill: clone(state.skill),
    zoom: clone(state.zoom),
  }),
  dispatch => bindActionCreators(Action, dispatch)
)

export default class SkillContainer extends Component<Props, any>
{
  render() {
    return (
      <div className="layout-skill">
        <SkillCloudCanvas
          cloud={SkillConst.rootCloud}
          selected={this.selectedNode}
          zoomper={this.props.zoom.percent}
          onRide={skill => this.ride(skill)}
          onDown={skill => this.ride(null)} />
        <ChartCanvas
          data={this.chartData} />
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
    const {selectSkill} = this.props
    selectSkill(SkillConst.initialSkill)
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
      const {selectSkill} = this.props
      selectSkill(skill)
    }
  }

  ride(skill: Skill) {
    if (!skill || skill.hasChildren) {
      const {displaySkill} = this.props
      displaySkill(skill)
    }
  }

  private get title(): string {
    const {selected, displayed} = this.props.skill
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
    const {selected, displayed} = this.props.skill
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

  private get selectedNode(): SkillNode {
    const {selected} = this.props.skill
    return SkillConst.rootCloud.findNodeBySkill(selected)
  }

  private get chartData(): ChartData {
    const {selected, displayed} = this.props.skill
    return match<Skill, ChartData>(displayed).
      caseOfNone(skill =>
        match<Skill, ChartData>(selected).
          caseOfNone(none => SkillConst.rootChart).
          caseOfElse(skill => ChartDataFactory.createBySkillList(selected.children)).
        end()
      ).
      caseOfElse(skill => ChartDataFactory.createBySkillList(displayed.children)).
    end()
  }
}
