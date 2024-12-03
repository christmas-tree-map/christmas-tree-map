import type { Meta, StoryObj } from '@storybook/react';
import FloatingButton from './FloatingButton';

const meta = {
  title: 'Common/FloatingButton',
  component: FloatingButton,
  tags: ['autodocs'],
  parameters: {
    controls: { exclude: 'onClick' },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '300px', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FloatingButton>;

export default meta;

type Story = StoryObj<typeof FloatingButton>;

export const Default: Story = {
  args: {
    onClick: () => alert('버튼이 클릭되었습니다!'),
  },
};
