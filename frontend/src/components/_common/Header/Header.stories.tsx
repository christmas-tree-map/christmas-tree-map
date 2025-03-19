import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';

const meta = {
  title: 'Common/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    backgroundColor: 'transparent',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    backgroundColor: 'transparent',
  },
};

export const Title: Story = {
  args: {
    title: '맞춤 코스 추천',
    backgroundColor: 'transparent',
  },
};
