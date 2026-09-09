import type { Decorator, Preview } from '@storybook/react';
import '../src/globals.css';

const themeDecorator: Decorator = (Story, context) => {
  document.documentElement.dataset.theme = context.globals.theme;

  return Story();
};

const preview: Preview = {
  decorators: [themeDecorator],
  globalTypes: {
    theme: {
      description: 'Global theme for the component preview',
      defaultValue: 'dark',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'dark', title: 'Dark' },
          { value: 'light', title: 'Light' },
        ],
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;