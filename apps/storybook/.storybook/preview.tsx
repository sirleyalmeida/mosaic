import type { Decorator, Preview } from '@storybook/react';
import { MosaicProvider } from '@mosaic/react';
import '../src/globals.css';

const themeDecorator: Decorator = (Story, context) => {
  document.documentElement.dataset.theme = context.globals.theme;
  return <Story />;
};

const directionDecorator: Decorator = (Story, context) => {
  const direction = (context.globals.direction as 'ltr' | 'rtl') || 'ltr';

  return (
    <MosaicProvider dir={direction}>
      <Story />
    </MosaicProvider>
  );
};

const preview: Preview = {
  decorators: [themeDecorator, directionDecorator],
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
    direction: {
      name: 'Text Direction',
      description: 'Switch layout orientation (LTR / RTL)',
      defaultValue: 'ltr',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'ltr', title: 'Left to Right (LTR)', icon: 'arrowrightalt' },
          { value: 'rtl', title: 'Right to Left (RTL)', icon: 'arrowleftalt' },
        ],
        dynamicTitle: true,
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