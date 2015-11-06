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
  private preMode: string

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
    .onRide(node => onSelect(node))
    .update(cloud.setMode(mode).nodes)
    this.preMode = mode

    window.addEventListener('resize', () => this.drawer.resize())
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.drawer.resize())
  }

  componentDidUpdate() {
    const {cloud, mode} = this.props
    if (mode !== this.preMode) {
      this.drawer.update(cloud.setMode(mode).nodes)
      this.preMode = mode
    }
  }
}
