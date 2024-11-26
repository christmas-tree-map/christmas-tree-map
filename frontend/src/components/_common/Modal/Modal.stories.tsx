import type { Meta, StoryObj } from '@storybook/react';

import Modal from './Modal';

const meta = {
  title: 'Common/Modal/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    isOpen: true,
    children: (
      <div
        style={{
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <h2>모달 내용</h2>
        <p>이것은 모달 레이아웃 예시입니다.</p>
      </div>
    ),
  },
};
