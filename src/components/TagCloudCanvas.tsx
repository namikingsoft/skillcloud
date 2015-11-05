import TagNode from 'domains/TagNode'
import TagCloud from 'domains/TagCloud'
import TagCloudDrawer from 'components/service/TagCloudDrawer'
import * as React from 'react'
import {Component, PropTypes} from 'react'

interface Props {
  cloud: TagCloud
  mode: string
  onSelect: (node: TagNode)=>void
}

export default class TagCloudCanvas extends Component<Props, any>
{
  private drawer: TagCloudDrawer

  render() {
    return (
      <div className="tagcloud">
        <svg ref="svg"></svg>
      </div>
    )
  }

  componentDidMount() {
    const {cloud, mode, onSelect} = this.props
    this.drawer = new TagCloudDrawer(
      React.findDOMNode(this.refs['svg'])
    )
    .onClick(node => onSelect(node))
    .update(cloud.setMode(mode).nodes)

    window.addEventListener('resize', () => this.drawer.resize())
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.drawer.resize())
  }

  componentDidUpdate() {
    const {cloud, mode} = this.props
    this.drawer.update(cloud.setMode(mode).nodes)
  }
}
