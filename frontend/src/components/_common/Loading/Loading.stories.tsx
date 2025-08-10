import type { Meta, StoryObj } from '@storybook/react';
import Loading from './Loading';

const meta = {
  title: 'common/Loading',
  component: Loading,
  tags: ['autodocs'],
  parameters: {
    controls: { exclude: ['status'] },
  },
} satisfies Meta<typeof Loading>;

export default meta;

type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  args: {
    variant: 'primary',
  },
};
