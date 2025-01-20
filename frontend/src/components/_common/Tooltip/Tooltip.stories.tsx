import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from '@/components/_common/Tooltip/Tooltip';

const meta = {
  title: 'common/Tooltip',
  component: Tooltip,
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

          height: '300px',
          overflow: 'hidden',
        }}
      >
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
          <Story />
        </button>
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    children: <p>툴팁 내용</p>,
  },
};
