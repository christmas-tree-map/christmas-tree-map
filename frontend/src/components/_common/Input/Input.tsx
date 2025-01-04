import { useEffect, useState } from 'react';
import { IoIosWarning } from '@react-icons/all-files/io/IoIosWarning';
import { IconType } from '@react-icons/all-files/lib';
import { vars } from '@/styles/theme.css';
import Dropdown from './Dropdown/Dropdown';
import * as S from './Input.css';

interface InputProps<T> extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  status?: 'default' | 'error';
  errorMessage?: string;
  variant?: 'default' | 'dropdown';
  buttonType?: 'none' | 'button' | 'submit';
  buttonImage?: IconType;
  dropdownList?: T[];
  value?: string;
  isOnlySubmitByDropdown?: boolean;
  onInputChange?: (value: string) => void;
}

const Input = <T extends { id: string; displayedKeyword: string }>({
  label,
  status = 'default',
  errorMessage,
  buttonType = 'none',
  buttonImage: ButtonImage,
  variant = 'default',
  dropdownList,
  onInputChange,
  value,
  isOnlySubmitByDropdown = false,
  ...props
}: InputProps<T>) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [foundIndex, setFoundIndex] = useState<number>(-1);

  useEffect(() => {
    if (dropdownList && dropdownList.length > 0 && value) {
      const index = dropdownList.findIndex((item) => item.displayedKeyword === value);
      if (index !== -1) {
        setFoundIndex(index);
        setSelectedIndex(index);
      } else {
        setFoundIndex(-1);
      }
    }
  }, [dropdownList, value]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!dropdownList || dropdownList.length === 0) return;

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const newIndex = selectedIndex + 1 === dropdownList.length ? -1 : selectedIndex + 1;
        setSelectedIndex(newIndex);
        return;
      }

      case 'ArrowUp': {
        event.preventDefault();
        const newIndex = selectedIndex === -1 ? dropdownList.length - 1 : selectedIndex - 1;
        setSelectedIndex(newIndex);
        return;
      }

      case 'Enter':
        event.preventDefault();
        handleSubmit();
        return;
    }
  };

  const handleSubmit = () => {
    if (!isOnlySubmitByDropdown && value && value !== '') {
      triggerFormSubmit();
      return;
    }
    if (selectedIndex !== -1 && dropdownList && dropdownList[selectedIndex]) {
      triggerFormSubmit();
    }
  };

  const triggerFormSubmit = () => {
    const form = document.querySelector('form');
    form?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange?.(event.target.value);
    setSelectedIndex(-1);
  };

  return (
    <div className={S.Layout}>
      {label && <label className={S.Label}>{label}</label>}
      {/* input 영역 */}
      <div className={S.InputBox[status]}>
        <input className={S.Input} onChange={handleInputChange} value={value} onKeyDown={handleKeyDown} {...props} />
        {buttonType !== 'none' && ButtonImage && (
          <button className={S.Button} type={buttonType} onClick={handleSubmit}>
            <ButtonImage color={vars.colors.grey[900]} size={25} />
          </button>
        )}
      </div>
      {/* 에러 메시지 */}
      {status === 'error' && errorMessage && (
        <div className={S.ErrorMessage}>
          <IoIosWarning color={vars.colors.primary[800]} />
          <p className={S.ErrorMessageText}>{errorMessage}</p>
        </div>
      )}
      {/* Dropdown */}
      {variant === 'dropdown' && dropdownList && (
        <Dropdown
          dropdownList={dropdownList}
          selectedIndex={selectedIndex}
          foundIndex={foundIndex}
          triggerFormSubmit={triggerFormSubmit}
          onInputChange={onInputChange}
          isOnlySubmitByDropdown={isOnlySubmitByDropdown}
        />
      )}
    </div>
  );
};

export default Input;
