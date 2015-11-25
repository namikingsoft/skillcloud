import Header from 'components/Header'
import Navigation from 'components/Navigation'
import Background from 'components/Background'
import CrossHair from 'components/CrossHair'
import Copyright from 'components/Copyright'
import * as React from 'react'
import {Component, PropTypes} from 'react'
import {Link} from 'react-router'

interface Props {
  children: Array<any>
}

interface State {
  flashTimeout: number
}

export default class Base extends Component<Props, State>
{
  private background: Background

  constructor() {
    super()
    this.state = {
      flashTimeout: 650,
    }
  }

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

  componentDidMount() {
    setTimeout(() => this.background.flash(), 1000)
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    setTimeout(() => this.background.flash(), 650)
  }
}
