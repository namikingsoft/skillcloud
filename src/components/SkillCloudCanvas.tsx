import SkillCloud from 'domains/SkillCloud'
import SkillNode from 'domains/SkillNode'
import SkillFactory from 'domains/SkillFactory'
import SkillCloudFactory from 'domains/SkillCloudFactory'
import SkillCloudDrawer from 'components/service/SkillCloudDrawer'
import * as React from 'react'
import {Component, PropTypes} from 'react'

interface Props {
  cloud: SkillCloud
  selected: SkillNode
  onSelect: Function
}

export default class SkillCloudCanvas extends Component<Props, any>
{
  private drawer: SkillCloudDrawer

  render() {
    return (
      <div className="skillcloud">
        <svg ref="svg"></svg>
      </div>
    )
  }

  componentDidMount() {
    const {cloud, onSelect} = this.props
    this.drawer = new SkillCloudDrawer(
      React.findDOMNode(this.refs['svg'])
    )
    .onClick(d => onSelect(d))
    .update(cloud.filter(null))

    window.addEventListener('resize', () => this.drawer.resize())

    setTimeout(() => {
      onSelect(cloud.nodes.get(0))
    }, 3000)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.drawer.resize())
  }

  componentDidUpdate() {
    const {cloud, selected} = this.props
    this.drawer.update(cloud.filter(selected))
  }
}
