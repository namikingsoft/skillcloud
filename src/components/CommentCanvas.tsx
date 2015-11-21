import * as React from 'react'
import {Component, PropTypes} from 'react'

interface Props {
  title: string
  comment: string
}

interface State {
  typing: string
}

export default class CommentCanvas extends Component<Props, State>
{
  private timerId: any

  constructor() {
    super()
    this.state = {
      typing: '',
    }
  }

  render() {
    const {title, comment} = this.props
    const {typing} = this.state
    return (
      <div className="module-comment">
        <h3><span className="typing">{typing}</span></h3>
        <div className="comment">
          {this.nl2br(comment)}
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const {title} = this.props
    const {typing} = this.state
    if (title !== prevProps.title) {
      clearTimeout(this.timerId)
      this.setState({
        typing: '',
      })
    }
    else if (title !== typing) {
      this.timerId = setTimeout(() => {
        this.setState({
          typing: title.slice(0, typing.length + 1),
        })
      }, 50)
    }
  }

  private nl2br(text: string) {
    return text.split(/\n\n/).map(line => {
      return React.createElement('p', null, line)
    })
  }
}
