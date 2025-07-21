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
    imgSrc:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTED-aeP_JPMA4xVO8O93klqd3q5mnEwhcAuzRSyQk2r_sV5M9HIOYoof2XiVGvvbeHTbI&usqp=CAU',
  },
};
