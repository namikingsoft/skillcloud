import * as React from 'react'
import {Component, PropTypes} from 'react'

interface Props {
  title: string
  comment: string
}

interface State {
  detail: string
  finished: boolean
}

export default class CommentCanvas extends Component<Props, State>
{
  constructor() {
    super()
    this.state = {
      detail: '',
      finished: false,
    }
  }

  render() {
    const {title, comment} = this.props
    const {detail, finished} = this.state
    return (
      <div className="module-comment">
        <h3>{title || "Initializing..."}</h3>
        <p className={finished? '' : 'writing'}>{detail}</p>
      </div>
    )
  }

  componentDidUpdate() {
    const {comment} = this.props
    const {detail, finished} = this.state
    if (finished && comment !== detail) {
      this.setState({
        detail: '',
        finished: false,
      })
    }
    else if (detail.length < comment.length) {
      setTimeout(() => {
        this.setState({
          detail: comment.slice(0, detail.length + 1),
          finished: false,
        })
      }, 10)
    }
    else if (!finished) {
      setTimeout(() => {
        this.setState({
          detail: comment,
          finished: true,
        })
      }, 100)
    }
  }
}
