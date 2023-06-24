import './index.css';

import { enableMapSet } from 'immer';
enableMapSet();

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { Root } from './components/root';
import { runtime, RuntimeProvider } from './runtime';
import { store } from './store';

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RuntimeProvider value={runtime}>
        <Root />
      </RuntimeProvider>
    </Provider>
  </React.StrictMode>
);
