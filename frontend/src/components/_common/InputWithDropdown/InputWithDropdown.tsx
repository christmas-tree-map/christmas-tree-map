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
  console.log(value);
  // 다른 곳 포커싱하면 dropdown 지워지는 기능 추가하기
  const [displayedValue, setDisplayedValue] = useState(value);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isDropdownRender, setIsDropdownRender] = useState(false);

  useEffect(() => {
    if (displayedValue.trim() === '') {
      setIsDropdownRender(false);
    } else {
      setIsDropdownRender(true);
    }
  }, [displayedValue]);

  useEffect(() => {
    if (isDropdownRender && dropdownList && value.trim() !== '') {
      const foundIndex = dropdownList.findIndex((item) => item.displayedKeyword === value);
      if (foundIndex !== -1) {
        setSelectedIndex(foundIndex);
      } else {
        setSelectedIndex(-1);
      }
    }
  }, [value]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!dropdownList || dropdownList.length === 0 || displayedValue.length === 0) return;

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const newIndex = selectedIndex + 1 === dropdownList.length ? 0 : selectedIndex + 1;
        setSelectedIndex(newIndex);
        if (newIndex !== -1) {
          setDisplayedValue(dropdownList[newIndex].displayedKeyword);
        }
        return;
      }

      case 'ArrowUp': {
        event.preventDefault();
        const newIndex = selectedIndex === 0 ? dropdownList.length - 1 : selectedIndex - 1;
        setSelectedIndex(newIndex);
        if (newIndex !== -1) {
          setDisplayedValue(dropdownList[newIndex].displayedKeyword);
        }
        return;
      }

      case 'Enter':
        event.preventDefault();
        if (selectedIndex !== -1) {
          onClickOption(dropdownList[selectedIndex]);
        }
        return;

      case 'Escape':
        event.preventDefault();
        setIsDropdownRender(false);
        setSelectedIndex(-1);
        return;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayedValue(event.target.value);
    onInputChange(event.target.value);
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
