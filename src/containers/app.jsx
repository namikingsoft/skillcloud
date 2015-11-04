import React, {Component, PropTypes} from 'react'
import {Router, Route} from 'react-router'
import {history} from 'react-router/lib/HashHistory';
import Navigation from 'containers/Navigation'
import SkillPage from 'containers/SkillPage'
import TagPage from 'containers/TagPage'
import NotFound from 'containers/NotFound'

export default class App extends Component
{
  render() {
    return (
      <div className="app">
        <Router history={history}>
          <Route component={Navigation}>
            <Route path="/" component={SkillPage} />
            <Route path="/skill" component={SkillPage} />
            <Route path="/tag/:mode" component={TagPage} />
            <Route path="*" component={NotFound} />
          </Route>
        </Router>
      </div>
    );
  }
}
