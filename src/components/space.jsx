import React, { Component, PropTypes } from 'react';

export default class Space extends Component
{
  render() {
    const { comment } = this.props;
    return (
      <div className="space"></div>
    );
  }
}
