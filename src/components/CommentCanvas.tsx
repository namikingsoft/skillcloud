import * as React from 'react'
import {Component, PropTypes} from 'react'

interface Props {
  title: string
  comment: string
}

interface State {
  detail: string
}

export default class CommentCanvas extends Component<Props, State>
{
  constructor() {
    super()
    this.state = {
      detail: '',
    }
  }

  render() {
    const {title, comment} = this.props
    const {detail} = this.state
    return (
      <div className="module-comment">
        <h3>{title || "Initializing..."}</h3>
        <p dangerouslySetInnerHTML={{__html:detail}}></p>
      </div>
    )
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const {comment} = this.props
    const {detail} = this.state
    if (comment !== prevProps.comment) {
      this.setState({
        detail: '',
      })
    }
    else if (detail.length < comment.length) {
      setTimeout(() => {
        this.setState({
          detail: comment.slice(0, detail.length + 1),
        })
      }, 10)
    }
  }
}
