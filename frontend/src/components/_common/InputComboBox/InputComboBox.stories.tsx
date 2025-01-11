import { useState } from 'react';
import { IoIosSearch } from '@react-icons/all-files/io/IoIosSearch';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import InputComboBox from './InputComboBox';

const meta = {
  title: 'common/InputComboBox',
  component: InputComboBox,
  tags: ['autodocs'],
} satisfies Meta<typeof InputComboBox>;

export default meta;

type Story = StoryObj<typeof InputComboBox>;

const SAMPLE_COMBOBOX_DATA = [
  {
    id: '1',
    displayedKeyword: '강남구1',
  },
  {
    id: '2',
    displayedKeyword: '강남구2',
  },
  {
    id: '3',
    displayedKeyword: '강남구3',
  },
  {
    id: '4',
    displayedKeyword: '강남구4',
  },
  {
    id: '5',
    displayedKeyword: '강남구5',
  },
];

const Template: StoryFn<typeof InputComboBox> = (args) => {
  const [value, setValue] = useState(args.value);

  const handleChangeValue = (newValue: string) => {
    setValue(newValue);
    args.onChangeValue(newValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inputValue = formData.get('comboBox');
    alert(`${inputValue} 제출!`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputComboBox {...args} value={value} onChangeValue={handleChangeValue} />
    </form>
  );
};

export const Default: Story = Template.bind({});
Default.args = {
  label: '라벨',
  buttonType: 'none',
  comboBoxList: SAMPLE_COMBOBOX_DATA,
  value: '',
  canSubmitByInput: true,
  onChangeValue: () => {},
  name: 'comboBox',
};

export const Button: Story = Template.bind({});
Button.args = {
  label: '라벨',
  buttonType: 'button',
  buttonImage: IoIosSearch,
  comboBoxList: SAMPLE_COMBOBOX_DATA,
  value: '',
  canSubmitByInput: true,
  onChangeValue: () => {},
  name: 'comboBox',
};

export const NoContent: Story = Template.bind({});
NoContent.args = {
  label: '라벨',
  buttonType: 'button',
  buttonImage: IoIosSearch,
  comboBoxList: [],
  value: '',
  canSubmitByInput: true,
  onChangeValue: () => {},
  name: 'comboBox',
};
