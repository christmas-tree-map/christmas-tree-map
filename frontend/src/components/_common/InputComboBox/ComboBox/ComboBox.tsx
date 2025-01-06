import { forwardRef, useEffect } from 'react';
import * as S from './ComboBox.css';

interface ComboBoxProps<T> {
  comboBoxList: T[];
  selectedIndex: number;
}

const ComboBox = forwardRef(
  <T extends { id: string; displayedKeyword: string }>(
    { comboBoxList, selectedIndex }: ComboBoxProps<T>,
    ref: React.ForwardedRef<HTMLUListElement>,
  ) => {
    useEffect(() => {
      if (ref && 'current' in ref && ref.current && selectedIndex !== null) {
        const node = ref.current;
        const selectedElement = node.children[selectedIndex] as HTMLElement;
        if (selectedElement) {
          selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }
    }, [selectedIndex, ref]);

    return (
      <div className={S.ComboBox}>
        <p className={S.ComboBoxLabel}>반드시 아래의 장소 중 하나로 선택해야 해요.</p>
        {comboBoxList?.length > 0 ? (
          <ul className={S.ComboBoxOptionBox} ref={ref}>
            {comboBoxList.map((item, index) =>
              item.displayedKeyword && typeof item.displayedKeyword === 'string' ? (
                <li
                  key={item.id}
                  className={selectedIndex === index ? S.ComboBoxOption['selected'] : S.ComboBoxOption['default']}
                >
                  {item.displayedKeyword}
                </li>
              ) : null,
            )}
          </ul>
        ) : (
          <div className={S.NoContentBox}>검색된 결과가 없어요! 다른 키워드를 입력해 주세요.</div>
        )}
      </div>
    );
  },
);

export default ComboBox;
