import { IoIosSearch } from '@react-icons/all-files/io/IoIosSearch';
import type { Meta, StoryObj } from '@storybook/react';
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
    displayedKeyword: '강남구',
  },
  {
    id: '2',
    displayedKeyword: '강남구',
  },
  {
    id: '3',
    displayedKeyword: '강남구',
  },
  {
    id: '4',
    displayedKeyword: '강남구',
  },
  {
    id: '5',
    displayedKeyword: '강남구',
  },
];

export const Default: Story = {
  args: {
    label: '라벨',
    buttonType: 'none',
    comboBoxList: SAMPLE_COMBOBOX_DATA,
    value: '',
    canSubmitByInput: true,
    onChangeValue: () => {},
  },
};

export const Button: Story = {
  args: {
    label: '라벨',
    buttonType: 'button',
    buttonImage: IoIosSearch,
    comboBoxList: SAMPLE_COMBOBOX_DATA,
    value: '',
    canSubmitByInput: true,
    onChangeValue: () => {},
  },
};

export const NoContent: Story = {
  args: {
    label: '라벨',
    buttonType: 'button',
    buttonImage: IoIosSearch,
    comboBoxList: [],
    value: '',
    canSubmitByInput: true,
    onChangeValue: () => {},
  },
};
