import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Decorator, Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { worker } from '../src/mocks/browser';
import '../src/styles/global.css';
import '../src/styles/reset.css';

// Start the MSW worker
worker.start();

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

const queryClient = new QueryClient();

export const decorators: Decorator[] = [
  (Story, context) => {
    const initialEntry = context.args.initialEntry || '/'; // 기본 경로 설정
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[initialEntry]}>
          <Story />
        </MemoryRouter>
      </QueryClientProvider>
    );
  },
];

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
