import React from 'react';
import { Provider } from 'react-redux';
import App from 'containers/app';
import configureStore from './store/configureStore';

// style
import 'styles/main.styl';
import 'nvd3/build/nv.d3.css';

const store = configureStore();

document.write('<div id="app"></div>');
React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('app')
);
