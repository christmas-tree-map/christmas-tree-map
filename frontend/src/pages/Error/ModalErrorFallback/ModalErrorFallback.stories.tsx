import { Meta, StoryFn } from '@storybook/react';
import { vars } from '@/styles/theme.css';
import ModalErrorFallback from './ModalErrorFallback';

export default {
  title: 'Error/ModalErrorFallback',
  component: ModalErrorFallback,
  argTypes: {
    statusCode: {
      control: {
        type: 'select',
      },
      options: [400, 404, 500, null],
      defaultValue: 400,
    },
  },
  parameters: {
    backgrounds: {
      values: [{ value: vars.colors.grey[100] }],
    },
  },
} as Meta;

const Template: StoryFn<{ statusCode: number }> = (args) => <ModalErrorFallback {...args} />;

export const Default = Template.bind({});
Default.args = {
  statusCode: 400,
};
