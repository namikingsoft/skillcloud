import Base from 'containers/Base'
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
          <Route component={Base}>
            <Route path="/" component={FirstContainer} />
            <Route path="/skill" component={SkillContainer} />
            <Route path="/skill/:action" component={SkillContainer} />
            <Route path="/tag/:mode" component={TagContainer} />
            <Route path="*" component={NotFound} />
          </Route>
        </Router>
      </div>
    );
  }
}
