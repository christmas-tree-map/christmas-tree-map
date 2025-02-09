import type { Meta, StoryObj } from '@storybook/react';
import CourseList from '@/components/Course/CourseList/CourseList';
import mockCourses from '@/mocks/data/courses.json';

const meta = {
  title: 'Course/CourseList',
  component: CourseList,
  tags: ['autodocs'],
  parameters: {
    controls: { exclude: ['courseList'] },
  },
} satisfies Meta<typeof CourseList>;

export default meta;

type Story = StoryObj<typeof CourseList>;

export const Default: Story = {
  args: {
    courseList: mockCourses,
  },
};
