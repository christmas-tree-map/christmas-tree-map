import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Meta, StoryFn } from '@storybook/react';
import FeedList from './FeedList';

export default {
  title: 'Feed/FeedList',
  component: FeedList,
} as Meta;

const Template: StoryFn<{ initialEntry: string }> = ({ initialEntry }) => (
  <Routes>
    <Route path="/map/:treeId" element={<FeedList />} />
  </Routes>
);

export const Default = Template.bind({});
Default.args = {
  initialEntry: '/map/123?modal=feeds',
};
