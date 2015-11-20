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

export default class Base extends Component<Props, any>
{
  render() {
    return (
      <div className="layout-base">
        <Header />
        <Navigation />
        <div className="layout-content">
          {this.props.children}
        </div>
        <Background />
        <CrossHair />
        <Copyright />
      </div>
    )
  }
}
