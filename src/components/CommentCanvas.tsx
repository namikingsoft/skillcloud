import * as React from 'react'
import {Component, PropTypes} from 'react'
import match from 'match-case'

interface Props {
  title: string
  comment: string
}

interface State {
  transition?: string
  transform?: string
  transformOrigin?: string
}

export default class CommentCanvas extends Component<Props, State>
{
  render() {
    const {title, comment} = this.props
    return (
      <div className="module-comment" style={this.state}>
        <h3>{title}</h3>
        <div className="comment">
          {this.nl2br(comment)}
        </div>
      </div>
    )
  }

  componentWillMount() {
    this.componentDidUpdate(this.props, this.state)
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const {title, comment} = this.props
    if (title !== prevProps.title || comment !== prevProps.comment) {
      new Promise((resolve, reject) => {
        this.setState({
          transition: "0.15s",
          transform: "translate(0, 500px)",
          transformOrigin: "0 0",
        })
        setTimeout(resolve, 150)
      }).
      then(() => new Promise((resolve, reject) => {
        this.setState({
          transition: "0.2s",
          transform: "",
          transformOrigin: "0 0",
        })
      }))
    }
  }

  private nl2br(text: string = "") {
    return text.split(/\n\n/).map(line => {
      return React.createElement('p', null, line)
    })
  }
}
