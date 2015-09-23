import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Cloud from 'components/cloud';
import Chart from 'components/chart';
import Comment from 'components/comment';
import * as SkillActions from '../actions/skill';

class App extends Component {
  render() {
    const { dispatch, data, comment, selected } = this.props;
    const actions = bindActionCreators(SkillActions, dispatch);
    return (
      <div className="app">
        <Cloud data={data} selected={selected} actions={actions} />
        <Chart selected={selected} actions={actions} />
        <Comment comment={comment} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { data, comment, selected } = state.skill;
  return {
    data,
    comment,
    selected,
  };
}

export default connect(mapStateToProps)(App);
