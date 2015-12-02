import * as React from 'react'
import {Component, PropTypes} from 'react'

interface Props {
  text: string
}

interface State {
  transition?: string
  transform?: string
  opacity?: number
}

export default class CloudLink  extends Component<Props, State>
{
  render() {
    return (
      <div className="module-cloudlink">
        <a href="#" onClick={e => this.click(e)}>{this.props.text}</a>
        <div className="module-cloudlink__background" style={this.state} />
      </div>
    )
  }

  click(e) {
    new Promise((resolve, reject) => {
      this.setState({
        transform: "scale(100)",
        transition: "opacity 0.5s ease-in",
        opacity: 1,
      })
      setTimeout(resolve, 500)
    }).
    then(() => {
      location.hash = "/cloud"
    })
    return false
  }
}
