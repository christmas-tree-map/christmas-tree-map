import { LayoutVisibilityProvider } from '@/contexts/LayoutVisibilityContext';
import type { Meta, StoryObj } from '@storybook/react';
import NavBar from './NavBar';

const meta = {
  title: 'Common/NavBar',
  component: NavBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <LayoutVisibilityProvider>
          <Story />
        </LayoutVisibilityProvider>
      </div>
    ),
  ],
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof NavBar>;

export const Default: Story = {};
