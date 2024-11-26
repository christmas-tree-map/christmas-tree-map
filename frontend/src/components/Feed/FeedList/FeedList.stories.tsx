import { BrowserRouter as Router } from 'react-router-dom';

import { Meta, StoryFn } from '@storybook/react';

import FeedList from './FeedList';

export default {
  title: 'Components/FeedList',
  component: FeedList,
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
} as Meta;

const Template: StoryFn = () => <FeedList />;

export const Default = Template.bind({});
