import type { Meta, StoryObj } from '@storybook/react';
import CourseItem from '@/components/Course/CourseItem/CourseItem';

const meta = {
  title: 'Course/CourseItem',
  component: CourseItem,
  tags: ['autodocs'],
} satisfies Meta<typeof CourseItem>;

export default meta;

type Story = StoryObj<typeof CourseItem>;

export const Default: Story = {
  args: {
    title: '가게 이름',
    address: '가가시 나나구 다다동 라라',
    phone: '010-1234-5678',
  },
};
