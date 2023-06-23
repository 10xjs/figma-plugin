import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './components/root';

import './index.css';
import { RuntimeProvider, Runtime } from './runtime';

const runtime = new Runtime();

ReactDOM.render(
  <React.StrictMode>
    <RuntimeProvider value={runtime}>
      <Root />
    </RuntimeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
