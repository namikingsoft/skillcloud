import React, {Component, PropTypes} from 'react'
import {Router, Route} from 'react-router'
import {history} from 'react-router/lib/HashHistory';
import Navigation from 'containers/Navigation'
import SkillCloudContainer from 'containers/SkillCloudContainer'
import TagCloudContainer from 'containers/TagCloudContainer'
import NotFound from 'containers/NotFound'

export default class App extends Component
{
  render() {
    return (
      <div className="app">
        <Router history={history}>
          <Route component={Navigation}>
            <Route path="/" component={SkillCloudContainer} />
            <Route path="/skill" component={SkillCloudContainer} />
            <Route path="/tag/:mode" component={TagCloudContainer} />
            <Route path="*" component={NotFound} />
          </Route>
        </Router>
      </div>
    );
  }
}
