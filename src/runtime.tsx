import { createContext, useContext } from 'react';

export class Runtime {
  constructor() {
    this._handleMessage = this._handleMessage.bind(this);

    window.addEventListener('message', this._handleMessage);
  }

  private _handleMessage(event: MessageEvent) {
    console.log(event.data);
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

export const context = createContext<Runtime | null>(null);

export const RuntimeProvider = context.Provider;

export const useRuntime = () => {
  const runtime = useContext(context);

  if (!runtime) {
    throw new Error('useRuntime must be used within a RuntimeProvider');
  }

  return runtime;
};
