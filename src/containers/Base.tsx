import Header from 'components/Header'
import Navigation from 'components/Navigation'
import Background from 'components/Background'
import CrossHair from 'components/CrossHair'
import Copyright from 'components/Copyright'
import * as Action from 'actions/Action'
import * as React from 'react'
import {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {clone} from 'lodash'

interface Props {
  children: Array<any>
  background: {
    timeout: number,
    seq: number,
  },
  flashBackground: (timeout: number)=>Object
}

@connect(
  state => new Object({
    background: clone(state.background),
  }),
  dispatch => bindActionCreators(Action, dispatch)
)

export default class Base extends Component<Props, any>
{
  private background: Background

  render() {
    return (
      <div className="layout-base">
        <Header />
        <Navigation />
        <div className="layout-content">
          {this.props.children}
        </div>
        <Background ref={v => this.background = v} />
        <Copyright />
      </div>
    )
  }

  componentDidUpdate(prevProps: Props) {
    const {flashBackground} = this.props
    const {timeout, seq} = this.props.background
    if (seq !== prevProps.background.seq) {
      setTimeout(() => this.background.flash(), timeout)
    } else {
      flashBackground(650)
    }
  }
}
