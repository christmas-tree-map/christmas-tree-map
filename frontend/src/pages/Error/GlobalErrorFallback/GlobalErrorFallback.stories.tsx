import { Meta, StoryFn } from '@storybook/react';
import GlobalErrorFallback from './GlobalErrorFallback';

export default {
  title: 'Error/GlobalErrorFallback',
  component: GlobalErrorFallback,
  argTypes: {
    statusCode: {
      control: {
        type: 'select',
      },
      options: [400, 404, 500, null],
      defaultValue: 400,
    },
  },
} as Meta;

const Template: StoryFn<{ statusCode: number; resetErrorBoundary: () => void }> = (args) => (
  <GlobalErrorFallback {...args} />
);

export const Default = Template.bind({});
Default.args = {
  statusCode: 400,
};
