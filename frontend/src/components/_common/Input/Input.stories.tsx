import { IoIosSearch } from '@react-icons/all-files/io/IoIosSearch';
import type { Meta, StoryObj } from '@storybook/react';
import Input from '@/components/_common/Input/Input';

const meta = {
  title: 'common/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    controls: { exclude: ['status'] },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: '레이블',
  },
};

export const Button: Story = {
  args: {
    label: '레이블',
    buttonType: 'button',
    buttonImage: IoIosSearch,
  },
};

export const Error: Story = {
  args: {
    label: '레이블',
    status: 'error',
    errorMessage: '에러 메시지',
  },
};
