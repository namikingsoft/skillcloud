import React, { Component, PropTypes } from 'react';

class Button extends Component {
  render() {
    const { actions } = this.props;
    return (
      <button onClick={() => actions.test('TEST')}>Push</button>
    );
  }
}

Button.propTypes = {
  actions: PropTypes.object.isRequired
};

export default Button;
