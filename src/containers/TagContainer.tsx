import Tag from 'domains/Tag'
import TagNode from 'domains/TagNode'
import TagCloudCanvas from 'components/TagCloudCanvas'
import ChartValue from 'domains/ChartValue'
import ChartData from 'domains/ChartData'
import ChartDataFactory from 'domains/ChartDataFactory'
import ChartCanvas from 'components/ChartCanvas'
import CommentCanvas from 'components/CommentCanvas'
import * as TagConst from 'constants/TagConst'
import * as Actions from 'actions/tag'
import * as React from 'react'
import {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {clone} from 'lodash'
import match from 'match-case'

interface Props {
  displayed: Tag
  params: {[index: string]: string}
  display: (tag: Tag)=>Object
}

@connect(
  state => clone(state.tag),
  dispatch => bindActionCreators(Actions, dispatch)
)

export default class TagContainer extends Component<Props, any>
{
  render() {
    const {displayed, params} = this.props
    const data: ChartData = displayed?
      ChartDataFactory.createByTagList(displayed.children) : null
    return (
      <div className="layout-tag">
        <TagCloudCanvas
          cloud={TagConst.rootCloud}
          mode={params['mode']}
          onRide={node => this.display(node)}
          onDown={node => this.display(null)} />
        <ChartCanvas
          data={this.chartData} />
        <CommentCanvas
          title={this.title}
          comment={this.comment} />
      </div>
    )
  }

  display(node: TagNode) {
    const {display} = this.props
    display(node ? node.parentTag : null)
  }

  private get title() {
    const {displayed, params} = this.props
    return match<Tag, string>(displayed).
      caseOfNone(none =>
        match<string, string>(params['mode']).
          caseOf("experience", v => "経験のある技術").
          caseOf("interest", v => "興味のある技術").
          caseOfElse("Initializing...").
        end()
      ).
      caseOfElse(tag => tag.name).
    end()
  }

  private get comment() {
    const {displayed, params} = this.props
    return match<Tag, string>(displayed).
      caseOfNone(none =>
        match<string, string>(params['mode']).
          caseOf("experience", v =>
            "経験のある技術を、ボールの大きさで経験度の度合いを表しています。\n\n" +
            "ボールにマウスに乗せると、関連のある技術がハイライトされます。"
          ).
          caseOf("interest", v =>
            "興味のある技術を、ボールの大きさで興味度の度合いを表しています。\n\n" +
            "ボールにマウスに乗せると、関連のある技術がハイライトされます。"
          ).
          caseOfElse("Initializing...").
        end()
      ).
      caseOfElse(tag => tag.comment).
    end()
  }

  private get chartData(): ChartData {
    const {displayed} = this.props
    return match<Tag, ChartData>(displayed).
      caseOfNone(none => TagConst.rootChart).
      caseOfElse(tag => ChartDataFactory.createByTagList(displayed.children)).
    end()
  }
}
