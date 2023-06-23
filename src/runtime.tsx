import { createContext, useContext } from 'react';

import { variableCollectionsSlice } from './features/variable-collections/variable-collections.slice';
import { variablesSlice } from './features/variables/variables.slice';
import { pluginMessageSchema } from './messages';
import { store } from './store';

export class Runtime {
  constructor() {
    this._handleMessage = this._handleMessage.bind(this);

    window.addEventListener('message', this._handleMessage);
  }

  private _handleMessage(event: MessageEvent) {
    if (!('pluginMessage' in event.data)) {
      return;
    }

    const result = pluginMessageSchema.safeParse(event.data.pluginMessage);

    if (!result.success) {
      console.error('Invalid message received from plugin');
      console.error(result.error);
      console.error(event.data);
      return;
    }

    const message = result.data;

    switch (message.type) {
      case 'init':
        store.dispatch(
          variablesSlice.actions.variablesReceived({
            variables: message.localVariables,
          })
        );

        store.dispatch(
          variableCollectionsSlice.actions.variableCollectionsReceived({
            variableCollections: message.localCollections,
          })
        );
        break;
    }
  }

  destroy() {
    window.removeEventListener('message', this._handleMessage);
  }

  resize(args: { width: number; height: number }) {
    window.parent.postMessage(
      {
        pluginMessage: {
          type: 'resize',
          ...args,
        },
      },
      '*'
    );
  }
}

export const runtime = new Runtime();

export const context = createContext<Runtime | null>(null);

export const RuntimeProvider = context.Provider;

export const useRuntime = () => {
  const runtime = useContext(context);

  if (!runtime) {
    throw new Error('useRuntime must be used within a RuntimeProvider');
  }

  return runtime;
};
