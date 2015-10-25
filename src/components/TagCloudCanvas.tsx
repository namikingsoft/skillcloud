import TagCloud from 'domains/TagCloud'
import TagFactory from 'domains/TagFactory'
import TagCloudFactory from 'domains/TagCloudFactory'
import TagCloudDrawer from 'domains/TagCloudDrawer'
import * as React from 'react'
import {Component, PropTypes} from 'react'

interface Props {
  data: any
  mode: string
}

export default class TagCloudCanvas extends Component<Props, any>
{
  private cloud: TagCloud
  private drawer: TagCloudDrawer

  render() {
    return (
      <div className="tagcloud">
        <svg ref="svg"></svg>
      </div>
    )
  }

  componentDidMount() {
    this.cloud = TagCloudFactory.create(
      TagFactory.create(this.props.data)
    ).setMode(this.props.mode)

    this.drawer = new TagCloudDrawer({
      nodes: this.cloud.nodes,
      svgElement: React.findDOMNode(this.refs['svg']),
    }).start()

    window.addEventListener('resize', () => this.drawer.resize())
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.drawer.resize())
  }

  componentDidUpdate() {
    this.cloud.setMode(this.props.mode)
    this.drawer.update()
  }
}
