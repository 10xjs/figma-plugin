/// <reference types="@figma/plugin-typings" />

import { uiMessageSchema } from './messages';

figma.ui.onmessage = (rawMessage: unknown) => {
  const result = uiMessageSchema.safeParse(rawMessage);

  if (!result.success) {
    console.error('Invalid message received from UI');
    console.error(result.error);
    return;
  }

  const message = result.data;

  switch (message.type) {
    case 'resize':
      const { width, height } = message;
      figma.ui.resize(width, height);
      figma.clientStorage.setAsync('size', { width, height });
      break;
    case 'notify': {
      message;

      const options: NotificationOptions = {
        timeout: message.options?.timeout,
        error: message.options?.error,
      };

      const button = message.options?.button;

      if (button) {
        options.button = {
          text: button.text,
          action: () => {
            switch (button.action) {
            }
          },
        };
      }

      figma.notify(message.message, options);
    }
  }
};

const DEFAULT_SIZE = { width: 600, height: 400 };

async function init() {
  await figma.clientStorage.getAsync('size').then((size) => {
    if (size) {
      figma.showUI(__html__, {
        themeColors: true,
        width: size.width,
        height: size.height,
      });
    } else {
      figma.showUI(__html__, {
        width: DEFAULT_SIZE.width,
        height: DEFAULT_SIZE.height,
        themeColors: true,
      });
    }
  });

  const localCollections = figma.variables.getLocalVariableCollections();
  const localVariables = figma.variables.getLocalVariables();

  figma.ui.postMessage({
    type: 'init',
    localCollections: localCollections.map((collection) => {
      return {
        id: collection.id,
        name: collection.name,
        remote: collection.remote,
        variableIds: collection.variableIds,
        defaultModeId: collection.defaultModeId,
        key: collection.key,
        modes: collection.modes,
      };
    }),
    localVariables: localVariables.map((variable) => {
      return {
        id: variable.id,
        name: variable.name,
        description: variable.description,
        remote: variable.remote,
        variableCollectionId: variable.variableCollectionId,
        key: variable.key,
        resolvedType: variable.resolvedType,
        valuesByMode: variable.valuesByMode,
        scopes: variable.scopes,
      };
    }),
  });
}

void init();
