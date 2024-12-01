import type { Meta, StoryObj } from '@storybook/react';
import FloatingButton from './FloatingButton';

const meta = {
  title: 'Common/FloatingButton',
  component: FloatingButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FloatingButton>;

export default meta;
type Story = StoryObj<typeof FloatingButton>;

export const Default: Story = {
  args: {
    onHandleClick: () => alert('버튼이 클릭되었습니다!'),
  },
};
