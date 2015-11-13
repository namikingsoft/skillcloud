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
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {clone} from 'lodash'

interface Props {
  selected: Tag
  params: {[index: string]: string}
  select: (tag: Tag)=>Object
}

@connect(
  state => clone(state.tag),
  dispatch => bindActionCreators(Actions, dispatch)
)

export default class TagContainer extends Component<Props, any>
{
  render() {
    const {selected, params} = this.props
    const data: ChartData = (()=>{
      if (selected) {
        return ChartDataFactory.createByTagList(selected.children)
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
      <div className="tagCloudContainer">
        <TagCloudCanvas
          cloud={TagConst.rootCloud}
          mode={params['mode']}
          onSelect={node => this.onSelectNode(node)} />
        <ChartCanvas
          data={data}
          root={TagConst.rootChart} />
        <CommentCanvas
          title={selected? selected.name: ''}
          comment={comment} />
      </div>
    )
  }

  onSelectNode(node: TagNode) {
    const {select} = this.props
    select(node.parentTag)
  }
}
