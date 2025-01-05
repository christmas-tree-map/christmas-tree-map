import { useEffect, useState } from 'react';
import { IconType } from '@react-icons/all-files/lib';
import { vars } from '@/styles/theme.css';
import Dropdown from './Dropdown/Dropdown';
import * as S from './InputWithDropdown.css';

interface InputWithDropdownProps<T> extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  buttonType?: 'none' | 'button' | 'submit';
  buttonImage?: IconType;
  dropdownList?: T[];
  onInputChange: (value: string) => void;
  value: string;
  onClickOption: (item: T) => void;
  canSubmitByButton?: boolean;
}

const InputWithDropdown = <T extends { id: string; displayedKeyword: string }>({
  label,
  buttonType = 'none',
  buttonImage: ButtonImage,
  dropdownList,
  onInputChange,
  value,
  onClickOption,
  canSubmitByButton = false,
  ...props
}: InputWithDropdownProps<T>) => {
  const [displayedValue, setDisplayedValue] = useState(value);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isDropdownRender, setIsDropdownRender] = useState(false);

  useEffect(() => {
    setIsDropdownRender(displayedValue.trim() !== '');
  }, [displayedValue]);

  useEffect(() => {
    if (isDropdownRender && dropdownList && value.trim() !== '') {
      const foundIndex = dropdownList.findIndex((item) => item.displayedKeyword === value);
      setSelectedIndex(foundIndex !== -1 ? foundIndex : -1);
    }
  }, [isDropdownRender, dropdownList, value]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!dropdownList || dropdownList.length === 0 || displayedValue.trim() === '') return;

    const cycleIndex = (currentIndex: number, direction: number) => {
      return (currentIndex + direction + dropdownList.length) % dropdownList.length;
    };

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const nextIndex = cycleIndex(selectedIndex, 1);
        setSelectedIndex(nextIndex);
        setDisplayedValue(dropdownList[nextIndex].displayedKeyword);
        break;
      }

      case 'ArrowUp': {
        event.preventDefault();
        const prevIndex = cycleIndex(selectedIndex, -1);
        setSelectedIndex(prevIndex);
        setDisplayedValue(dropdownList[prevIndex].displayedKeyword);
        break;
      }

      case 'Enter':
        event.preventDefault();
        if (selectedIndex !== -1) {
          onClickOption(dropdownList[selectedIndex]);
        }
        break;

      case 'Escape':
        event.preventDefault();
        setIsDropdownRender(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDisplayedValue(value);
    onInputChange(value);
  };

  return (
    <div className={S.Layout}>
      {label && <label className={S.Label}>{label}</label>}

      <div className={S.InputBox}>
        <input
          {...props}
          className={S.Input}
          value={displayedValue}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
        />
        {buttonType !== 'none' && ButtonImage && (
          <button className={S.Button[canSubmitByButton ? 'clickable' : 'default']}>
            <ButtonImage color={vars.colors.grey[900]} size={25} />
          </button>
        )}
      </div>

      {dropdownList && isDropdownRender && (
        <Dropdown dropdownList={dropdownList} selectedIndex={selectedIndex} onClickOption={onClickOption} />
      )}
    </div>
  );
};

export default InputWithDropdown;
