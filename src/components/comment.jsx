import React, { Component, PropTypes } from 'react';

export default class Comment extends Component
{
  static propTypes = {
    comment: PropTypes.string.isRequired,
  }

  static defaultProps = {
  }

  render() {
    const { comment } = this.props;
    return (
      <div className="comment">
        <p>{comment}</p>
      </div>
    );
  }
}
