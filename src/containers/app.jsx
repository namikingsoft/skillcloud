import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'components/button';
import Cloud from 'components/cloud';
import { HorChart } from 'components/graph';
import * as TestActions from '../actions/tests';

class App extends Component {
  render() {
    const { dispatch } = this.props;
    const actions = bindActionCreators(TestActions, dispatch);
    return (
      <p>
        Hello World!
        <Button actions={actions} />
        <HorChart />
        <Cloud />
      </p>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(App);
