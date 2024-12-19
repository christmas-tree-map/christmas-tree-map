import type { Meta, StoryObj } from '@storybook/react';
import FeedItem from './FeedItem';

const meta = {
  title: 'Feed/FeedItem',
  component: FeedItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FeedItem>;

export default meta;
type Story = StoryObj<typeof FeedItem>;

const data = {
  nickname: '사용자 이름',
  updatedAt: '2024-12-01',
  imageUrl: 'https://via.placeholder.com/150',
  likeCount: 42,
  content: '이것은 피드 아이템의 내용입니다.',
  treeImageCode: 'TREE_01',
};

export const Default: Story = {
  args: { feed: data },
};
