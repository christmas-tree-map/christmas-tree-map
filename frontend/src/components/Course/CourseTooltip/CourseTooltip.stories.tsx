import type { Meta, StoryObj } from '@storybook/react';
import CourseTooltip from '@/components/Course/CourseTooltip/CourseTooltip';

const meta = {
  title: 'Course/CourseTooltip',
  component: CourseTooltip,
  tags: ['autodocs'],
  parameters: {
    controls: { exclude: ['children'] },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#888' }, // 어두운 배경
      ],
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          height: '500px',
          overflow: 'hidden',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CourseTooltip>;

export default meta;

type Story = StoryObj<typeof CourseTooltip>;

export const Default: Story = {
  args: {
    isOpen: true,
    id: '1',
    type: 'lunch',
    title: '가게 이름',
    children: (
      <button
        style={{
          position: 'relative',

          width: '100px',
          height: '50px',

          backgroundColor: '#FFF',
          borderRadius: '10px',
          color: '#000',
          textAlign: 'center',
        }}
      >
        툴팁 버튼
      </button>
    ),
  },
};
