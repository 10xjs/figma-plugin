import { messageSchema } from './messages';

figma.showUI(__html__, { themeColors: true });

void figma.clientStorage.getAsync('size').then((size) => {
  if (size) figma.ui.resize(size.width, size.height);
});

figma.ui.onmessage = (rawMessage: unknown) => {
  const result = messageSchema.safeParse(rawMessage);

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
  }
};
