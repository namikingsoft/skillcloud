import * as React from 'react'
import {Component, PropTypes} from 'react'

interface Props {
  className: string
  id?: string
  children?: Component<any, any>[]
}

interface State {
  minHeight: number
}

export default class FullBlock extends Component<Props, State>
{
  render() {
    return (
      <div className={this.props.className} id={this.props.id} style={this.state}>
        {this.props.children}
      </div>
    )
  }

  componentDidMount() {
    this.resize()
    window.addEventListener('resize', e => this.resize())
  }

  componentWillUnmount() {
    window.removeEventListener('resize', e => this.resize())
  }

  resize() {
    this.setState({
      minHeight: window.innerHeight,
    })
  }
}
