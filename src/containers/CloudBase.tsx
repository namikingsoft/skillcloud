import Decoration from 'containers/Decoration'
import Header from 'components/Header'
import Navigation from 'components/Navigation'
import ZoomSlider from 'components/ZoomSlider'
import Copyright from 'components/Copyright'
import * as Action from 'actions/Action'
import * as React from 'react'
import {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

interface Props {
  children: Array<any>
  flashBackground: (timeout: number)=>Object
  changeZoom: (percent: number)=>Object
}

@connect(
  null,
  dispatch => bindActionCreators(Action, dispatch)
)

export default class CloudBase extends Component<Props, any>
{
  render() {
    const {changeZoom} = this.props
    return (
      <div className="layout-cloud">
        <Header />
        <Navigation />
        <ZoomSlider onChange={percent => changeZoom(percent)} />
        <div className="layout-content">
          {this.props.children}
        </div>
        <Copyright />
        <Decoration />
      </div>
    )
  }

  componentDidUpdate(prevProps: Props) {
    const {flashBackground} = this.props
    flashBackground(650)
  }
}
