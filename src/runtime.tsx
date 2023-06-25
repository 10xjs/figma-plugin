import { createContext, useContext } from 'react';

import { variableCollectionsSlice } from './features/variable-collections/variable-collections.slice';
import { variablesSlice } from './features/variables/variables.slice';
import { NotifyOptions, pluginMessageSchema } from './messages';
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

  notify(message: string, options?: NotifyOptions) {
    window.parent.postMessage(
      {
        pluginMessage: {
          type: 'notify',
          message,
          options,
        },
      },
      '*'
    );
  }

  copyTokens() {
    const { variableCollections, variables } = store.getState();

    const data = {
      variableCollections: variableCollections.entities,
      variables: variables.entities,
    };

    const textarea = document.createElement('textarea');
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.opacity = '0';

    document.body.appendChild(textarea);

    textarea.value = JSON.stringify(data, null, 2);
    textarea.select();

    document.execCommand('copy');

    this.notify('Variables copied to clipboard');
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
