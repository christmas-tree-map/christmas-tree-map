import type { Meta, StoryObj } from '@storybook/react';
import CourseSearchedPlaceItem from './CourseSearchedPlaceItem';

const meta = {
  title: 'Course/CourseSearchedPlaceItem',
  component: CourseSearchedPlaceItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CourseSearchedPlaceItem>;

export default meta;
type Story = StoryObj<typeof CourseSearchedPlaceItem>;

const SAMPLE_DATA = {
  address_name: '경기 용인시 처인구 포곡읍 전대리 310',
  category_group_code: 'AT4',
  category_group_name: '관광명소',
  category_name: '여행 > 관광,명소 > 테마파크',
  distance: '',
  id: '784414359',
  phone: '031-320-5000',
  place_name: '에버랜드',
  place_url: 'http://place.map.kakao.com/784414359',
  road_address_name: '경기 용인시 처인구 포곡읍 에버랜드로 199',
  x: '127.20219830178264',
  y: '37.293101115700345',
};

export const Default: Story = {
  args: { place: SAMPLE_DATA },
};
