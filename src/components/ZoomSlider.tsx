import * as React from 'react'
import {Component, PropTypes} from 'react'

interface Props {
  onChange?: (percent: number)=>void
}

export default class ZoomSlider extends Component<Props, any>
{
  render() {
    const {onChange} = this.props
    return (
      <div className="module-zoomslider">
        <i className="fa fa-search"></i>
        <input type="range" min="50" max="150" defaultValue="100"
          ref="slider" onChange={e => onChange(this.value)} />
        <i className="fa fa-plus"></i>
      </div>
    )
  }

  private get value() {
    const slider: any = React.findDOMNode(this.refs['slider']) // @todo any
    return slider.value
  }
}
