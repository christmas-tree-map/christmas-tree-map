import type { Meta, StoryObj } from '@storybook/react';
import CourseList from '@/components/CourseDetail/CourseList/CourseList';

const meta = {
  title: 'CourseDetail/CourseList',
  component: CourseList,
  tags: ['autodocs'],
} satisfies Meta<typeof CourseList>;

export default meta;

type Story = StoryObj<typeof CourseList>;

export const Default: Story = {
  args: {
    courseList: {
      lunch: {
        id: 1,
        place_name: '농민백암순대',
        address_name: '서울 강남구 선릉로86길 40-4 알앤지타운 1층',
        phone: '02-555-9603',
      },
      cafe: {
        id: 1,
        place_name: '농민백암순대',
        address_name: '서울 강남구 선릉로86길 40-4 알앤지타운 1층',
        phone: '02-555-9603',
      },
      attraction: {
        id: 1,
        place_name: '농민백암순대',
        address_name: '서울 강남구 선릉로86길 40-4 알앤지타운 1층',
        phone: '02-555-9603',
      },
      dinner: {
        id: 1,
        place_name: '농민백암순대',
        address_name: '서울 강남구 선릉로86길 40-4 알앤지타운 1층',
        phone: '02-555-9603',
      },
    },
  },
};
