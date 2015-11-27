import CloudBase from 'containers/CloudBase'
import FirstContainer from 'containers/FirstContainer'
import SkillContainer from 'containers/SkillContainer'
import TagContainer from 'containers/TagContainer'
import NotFound from 'containers/NotFound'
import React, {Component, PropTypes} from 'react'
import {Router, Route} from 'react-router'
import createHashHistory from 'history/lib/createHashHistory'

export default class App extends Component
{
  render() {
    return (
      <div className="layout-app">
        <Router history={createHashHistory()}>
          <Route component={CloudBase}>
            <Route path="/cloud" component={FirstContainer} />
            <Route path="/cloud/skill" component={SkillContainer} />
            <Route path="/cloud/skill/:action" component={SkillContainer} />
            <Route path="/cloud/tag/:mode" component={TagContainer} />
          </Route>
          <Route path="*" component={NotFound} />
        </Router>
      </div>
    );
  }
}
