import type { Meta, StoryObj } from '@storybook/react';

import Component from '@/components/Component';

const meta = {
  title: 'Component',
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {};
