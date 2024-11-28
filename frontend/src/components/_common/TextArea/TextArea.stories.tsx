import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TextArea from './TextArea';

const meta = {
  title: 'Common/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof TextArea>;

const TextAreaWithHooks = () => {
  const [value, setValue] = useState('');

  return (
    <TextArea onChange={(e) => setValue(e.target.value)} value={value}>
      <TextArea.Label label="label" />
    </TextArea>
  );
};

export const Default: Story = {
  render: () => <TextAreaWithHooks />,
};

const WithPrefilledTextComponent = () => {
  const [value, setValue] = useState('이것은 미리 입력된 텍스트입니다.');
  return (
    <TextArea onChange={(e) => setValue(e.target.value)} value={value}>
      <TextArea.Label label="label" />
    </TextArea>
  );
};

export const WithPrefilledText: Story = {
  render: () => <WithPrefilledTextComponent />,
};

const WithoutLabelComponent = () => {
  const [value, setValue] = useState('');
  return <TextArea onChange={(e) => setValue(e.target.value)} value={value} />;
};

export const WithoutLabel: Story = {
  render: () => <WithoutLabelComponent />,
};
