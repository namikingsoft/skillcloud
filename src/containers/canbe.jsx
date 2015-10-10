import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Cloud from 'components/cloud';
import Chart from 'components/chart';
import Comment from 'components/comment';
import Space from 'components/space';
import * as Actions from '../actions/app';

@connect(
  state => {
    const  {data, comment, selected} = state.skill;
    return {data, comment, selected};
  },
  dispatch => bindActionCreators(Actions, dispatch)
)
export default class Canbe extends Component
{
  render() {
    const {data, comment, selected, select} = this.props;
    return (
      <div className="canbe">
        <Cloud data={data} selected={selected} onSelect={select} />
        <Chart data={data} selected={selected} onSelect={select} />
        <Comment comment={comment} />
        <Space />
      </div>
    );
  }
}
