import React, {Component, PropTypes} from 'react'
import {Router, Route} from 'react-router'
import createHashHistory from 'history/lib/createHashHistory'
import Navigation from 'containers/Navigation'
import SkillContainer from 'containers/SkillContainer'
import TagContainer from 'containers/TagContainer'
import NotFound from 'containers/NotFound'

export default class App extends Component
{
  render() {
    return (
      <div className="app">
        <Router history={createHashHistory()}>
          <Route component={Navigation}>
            <Route path="/" component={SkillContainer} />
            <Route path="/skill" component={SkillContainer} />
            <Route path="/tag/:mode" component={TagContainer} />
            <Route path="*" component={NotFound} />
          </Route>
        </Router>
      </div>
    );
  }
}
