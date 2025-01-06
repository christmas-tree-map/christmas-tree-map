import * as S from './ComboBox.css';

interface ComboBoxProps<T> {
  comboBoxList: T[];
  selectedIndex: number | null;
}

const ComboBox = <T extends { id: string; displayedKeyword: string }>({
  comboBoxList,
  selectedIndex,
}: ComboBoxProps<T>) => {
  return (
    <ul className={S.ComboBox}>
      {comboBoxList?.length > 0 ? (
        <>
          <p className={S.ComboBoxLabel}>반드시 아래의 장소 중 하나로 선택해야 해요.</p>
          <div className={S.ComboBoxOptionBox}>
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
          </div>
        </>
      ) : (
        <div className={S.NoContentBox}>검색된 결과가 없어요! 다른 키워드를 입력해 주세요.</div>
      )}
    </ul>
  );
};

export default ComboBox;
