import React, { Component, PropTypes } from 'react';

export default class NotFound extends Component
{
  render() {
    const { comment } = this.props;
    return (
      <div className="notfound">
        Not Found
      </div>
    );
  }
}
