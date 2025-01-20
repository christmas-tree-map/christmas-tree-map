import type { Meta, StoryObj } from '@storybook/react';
import Button from '@/components/_common/Button/Button';

const meta = {
  title: 'common/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    controls: { exclude: ['color'] },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Hello World!',
  },
};

export const Primary: Story = {
  args: {
    color: 'primary',
    children: 'Hello World!',
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    children: 'Hello World!',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Hello World!',
    disabled: true,
  },
};
