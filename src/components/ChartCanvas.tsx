import SkillCloud from 'domains/SKillCloud'
import SkillNode from 'domains/SKillNode'
import Skill from 'domains/SKill'
import * as React from 'react'
import {Component, PropTypes} from 'react'
import {sortBy} from 'lodash'

const d3 = require('d3')
const nv = require('nvd3/build/nv.d3')

interface Props {
  cloud: SkillCloud
  selected: SkillNode
  onSelect: Function
}

export default class ChartCanvas extends Component<Props, any>
{
  render() {
    return (
      <div className="chart">
        <svg ref="svg"></svg>
      </div>
    )
  }

  componentDidMount() {
    this.dataset()
  }

  componentWillUnmount() {
  }

  componentDidUpdate() {
    this.dataset()
  }

  dataset() {
    const {cloud, selected} = this.props
    let node: SkillNode
    if (!selected || !selected.skill.hasChildren) {
      node = cloud.nodes.get(0)
    } else {
      node = selected
    }
    let experiences = node.skill.children.map<Object>(skill => {
      return {
        label: skill.name,
        value: skill.experience,
      }
    }).toArray()
    let interests = node.skill.children.map<Object>(skill => {
      return {
        label: skill.name,
        value: skill.interest,
      }
    }).toArray()
    experiences = sortBy(experiences, row => -row['value'])
    this.update([
      {
        key: '経験',
        color: "#d67777",
        values: experiences,
      },
      {
        key: '興味',
        color: "#7777d6",
        values: interests,
      },
    ])
  }

  update(data) {
    var chart = nv.models.multiBarHorizontalChart();
    chart
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .margin({top: 30, right: 20, bottom: 30, left: 100})
      .showValues(false)
      .showControls(false)
      .tooltip.enabled(false)
    chart
      .yAxis.tickFormat(d3.format(',.2f'));
    d3.select(React.findDOMNode(this.refs['svg']))
      .datum(data)
      .call(chart)
      .selectAll('.nv-bar')
        .on('click', (d) => {
          const {cloud, selected, onSelect} = this.props;
          if (selected && selected.skill.hasChildren) {
            selected.skill.children.forEach(skill => {
              if (d.label == skill.name && skill.hasChildren) {
                return onSelect(cloud.findNodeBySkill(skill));
              }
            })
          }
          onSelect(cloud.nodes.get(0));
        })
    nv.utils.windowResize(chart.update);
  }
}
