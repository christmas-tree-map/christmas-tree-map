import type { Meta, StoryObj } from '@storybook/react';
import ScreenOverlay from '@/components/_common/ScreenOverlay/ScreenOverlay';

const meta = {
  title: 'common/ScreenOverlay',
  component: ScreenOverlay,
  tags: ['autodocs'],
  parameters: {
    controls: { exclude: ['closeOverlay'] },
  },
} satisfies Meta<typeof ScreenOverlay>;

export default meta;

type Story = StoryObj<typeof ScreenOverlay>;

export const Default: Story = {
  args: {
    title: '제목',
    closeOverlay: () => alert('오버레이 닫기'),
  },
};
