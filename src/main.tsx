import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Root } from './components/root';
import { runtime, RuntimeProvider } from './runtime';
import { store } from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RuntimeProvider value={runtime}>
        <Root />
      </RuntimeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
