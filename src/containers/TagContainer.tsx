import Tag from 'domains/Tag'
import TagNode from 'domains/TagNode'
import TagCloudCanvas from 'components/TagCloudCanvas'
import ChartValue from 'domains/ChartValue'
import ChartData from 'domains/ChartData'
import ChartDataFactory from 'domains/ChartDataFactory'
import ChartCanvas from 'components/ChartCanvas'
import CommentCanvas from 'components/CommentCanvas'
import * as TagConst from 'constants/TagConst'
import * as Action from 'actions/Action'
import * as React from 'react'
import {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {clone} from 'lodash'
import match from 'match-case'

interface Props {
  tag: {
    displayed: Tag,
  }
  zoom: {
    percent: number,
  }
  params: {[index: string]: string}
  displayTag: (tag: Tag)=>Object
}

@connect(
  state => new Object({
    tag: clone(state.tag),
    zoom: clone(state.zoom),
  }),
  dispatch => bindActionCreators(Action, dispatch)
)

export default class TagContainer extends Component<Props, any>
{
  render() {
    const {params} = this.props
    const {displayed} = this.props.tag
    const data: ChartData = displayed?
      ChartDataFactory.createByTagList(displayed.children) : null
    return (
      <div className="layout-tag">
        <TagCloudCanvas
          cloud={TagConst.rootCloud}
          mode={params['mode']}
          zoomper={this.props.zoom.percent}
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
    const {displayTag} = this.props
    displayTag(node ? node.parentTag : null)
  }

  private get title() {
    const {params} = this.props
    const {displayed} = this.props.tag
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
    const {params} = this.props
    const {displayed} = this.props.tag
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
    const {displayed} = this.props.tag
    return match<Tag, ChartData>(displayed).
      caseOfNone(none => null).
      caseOfElse(tag => ChartDataFactory.createByTagList(displayed.children)).
    end()
  }
}
