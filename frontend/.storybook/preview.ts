import type { Preview } from '@storybook/react';

import { worker } from '../src/mocks/browser';
import '../src/styles/global.css';
import '../src/styles/reset.css';

// Start the MSW worker
worker.start();

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

const preview: Preview = {
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
