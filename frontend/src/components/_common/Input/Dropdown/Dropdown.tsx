import React, { useEffect } from 'react';
import * as S from './Dropdown.css';

interface DropdownProps<T> {
  dropdownList: T[];
  selectedIndex: number | null;
  foundIndex: number | null;
  triggerFormSubmit: () => void;
  onInputChange?: (value: string) => void;
}

const Dropdown = <T extends { id: string; displayedKeyword: string }>({
  dropdownList,
  selectedIndex,
  foundIndex,
  triggerFormSubmit,
  onInputChange,
}: DropdownProps<T>) => {
  useEffect(() => {
    if (selectedIndex !== null && dropdownList && dropdownList[selectedIndex]) {
      onInputChange?.(dropdownList[selectedIndex].displayedKeyword);
    }
  }, [selectedIndex, dropdownList]);

  return (
    <ul className={S.DropdownBox}>
      {dropdownList?.length > 0 ? (
        <>
          <p className={S.DropdownLabel}>반드시 아래의 장소 중 하나로 선택해야 해요.</p>
          <div className={S.DropdownOptionBox}>
            {dropdownList.map((item, index) =>
              item.displayedKeyword && typeof item.displayedKeyword === 'string' ? (
                <li
                  key={item.id}
                  className={
                    selectedIndex !== -1 && (index === selectedIndex || index === foundIndex)
                      ? S.DropdownOption['selected']
                      : S.DropdownOption['default']
                  }
                  onMouseUp={() => {
                    triggerFormSubmit();
                  }}
                  onKeyDown={() => {
                    triggerFormSubmit();
                  }}
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
  );
};

export default Dropdown;
