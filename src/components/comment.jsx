import React, { Component, PropTypes } from 'react';

class Comment extends Component {
  render() {
    const { comment } = this.props;
    return (
      <div className="comment">
        <p>{comment}</p>
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.string.isRequired,
};

export default Comment;
