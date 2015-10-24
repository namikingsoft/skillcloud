import TagCloudDrawer from 'domains/TagCloudDrawer'
import React, {Component, PropTypes} from 'react'

export default class TagCloud extends Component
{
  render() {
    return (
      <div className="tagcloud">
        <svg ref="svg"></svg>
      </div>
    )
  }

  componentDidMount() {
    this.drawer = new TagCloudDrawer({
      svgElement: this.refs.svg,
    })
    .resize()
    .update()
    window.addEventListener('resize', () => this.resize())
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.resize())
  }

  componentDidUpdate() {
  }
}
