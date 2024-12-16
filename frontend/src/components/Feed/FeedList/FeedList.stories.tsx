import { Meta, StoryFn } from '@storybook/react';
import FeedList from './FeedList';

export default {
  title: 'Feed/FeedList',
  component: FeedList,
} as Meta;

const Template: StoryFn = () => <FeedList />;

export const Default = Template.bind({});
