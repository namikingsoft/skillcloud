import React, {Component, PropTypes} from 'react'
import {Router, Route} from 'react-router'
import createHashHistory from 'history/lib/createHashHistory'
import Navigation from 'containers/Navigation'
import About from 'containers/About'
import SkillPage from 'containers/SkillPage'
import TagPage from 'containers/TagPage'
import NotFound from 'containers/NotFound'

export default class App extends Component
{
  render() {
    return (
      <div className="app">
        <Router history={createHashHistory()}>
          <Route component={Navigation}>
            <Route path="/" component={About} />
            <Route path="/skill" component={SkillPage} />
            <Route path="/tag/:mode" component={TagPage} />
            <Route path="*" component={NotFound} />
          </Route>
        </Router>
      </div>
    );
  }
}
