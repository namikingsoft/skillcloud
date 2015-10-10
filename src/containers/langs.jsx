import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Bubble from 'components/bubble'
import Force from 'components/force'
import Pack from 'components/pack'
import * as Actions from '../actions/app'

@connect(
  state => {
    const  {data} = state.langs
    return {data}
  },
  dispatch => bindActionCreators(Actions, dispatch)
)
export default class Langs extends Component
{
  render() {
    const {data} = this.props
    const {type} = this.props.params
    return (
      <div className="langs">
        <Force data={data} type={type} />
      </div>
    )
  }
}
