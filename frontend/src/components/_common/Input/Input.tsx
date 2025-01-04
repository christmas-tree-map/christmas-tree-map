import { useEffect, useState } from 'react';
import { IoIosWarning } from '@react-icons/all-files/io/IoIosWarning';
import { IconType } from '@react-icons/all-files/lib';
import { vars } from '@/styles/theme.css';
import * as S from './Input.css';

interface InputProps<T> extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  status?: 'default' | 'error';
  errorMessage?: string;
  variant?: 'default' | 'dropdown';
  buttonType?: 'none' | 'button' | 'submit';
  buttonImage?: IconType;
  dropdownList?: T[];
  onDropdownSelect?: (item: T) => void;
}

const Input = <T extends { id: string; displayedKeyword: string }>({
  label,
  status = 'default',
  errorMessage,
  buttonType = 'none',
  buttonImage: ButtonImage,
  variant = 'default',
  dropdownList,
  onDropdownSelect,
  onChange,
  ...props
}: InputProps<T>) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!dropdownList || dropdownList.length === 0) return;

    let newIndex: number | null = selectedIndex;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        newIndex = selectedIndex === null ? 0 : selectedIndex + 1 === dropdownList.length ? null : selectedIndex + 1;
        setSelectedIndex(newIndex);
        break;

      case 'ArrowUp':
        event.preventDefault();
        newIndex = selectedIndex === null ? dropdownList.length - 1 : selectedIndex === 0 ? null : selectedIndex - 1;
        setSelectedIndex(newIndex);
        break;

      case 'Enter':
        event.preventDefault();
        if (selectedIndex !== null && dropdownList[selectedIndex]) {
          const selectedItem = dropdownList[selectedIndex];
          onDropdownSelect?.(selectedItem);
        }
        break;
    }
  };

  useEffect(() => {
    if (selectedIndex !== null && dropdownList && dropdownList[selectedIndex]) {
      const selectedItem = dropdownList[selectedIndex];

      const inputEvent = {
        target: { value: selectedItem.displayedKeyword },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(inputEvent);
    }
  }, [selectedIndex, dropdownList, onChange]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    setSelectedIndex(null);
  };

  return (
    <div className={S.Layout}>
      {label && <label className={S.Label}>{label}</label>}
      {/* input 영역 */}
      <div className={S.InputBox[status]}>
        <input className={S.Input} onChange={handleInputChange} onKeyDown={handleKeyDown} {...props} />
        {buttonType !== 'none' && ButtonImage && (
          <button className={S.Button} type={buttonType}>
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
        <>
          <ul className={S.DropdownBox}>
            {dropdownList?.length > 0 ? (
              <>
                <p className={S.DropdownLabel}>반드시 아래의 장소 중 하나로 선택해야 해요.</p>
                <div className={S.DropdownOptionBox}>
                  {dropdownList.map((item, index) =>
                    item.displayedKeyword && typeof item.displayedKeyword === 'string' ? (
                      <li
                        className={index === selectedIndex ? S.DropdownOption['selected'] : S.DropdownOption['default']}
                        onMouseUp={() => onDropdownSelect?.(item)}
                        onKeyDown={() => onDropdownSelect?.(item)}
                      >
                        {item.displayedKeyword}
                      </li>
                    ) : null,
                  )}
                </div>
              </>
            ) : (
              <div className={S.NoContentBox}>검색된 결과가 없어요! 다른 키워드를 입력해 주세요.</div>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default Input;
