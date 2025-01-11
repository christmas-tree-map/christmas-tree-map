import { IconType } from '@react-icons/all-files/lib';
import useClickOutside from '@/hooks/_common/useClickOutside';
import useComboBox from '@/hooks/_common/useComboBox';
import Input from '../Input/Input';
import ComboBox from './ComboBox/ComboBox';
import * as S from './InputComboBox.css';

interface InputComboBoxProps<T> extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  buttonType?: 'none' | 'button' | 'submit';
  buttonImage?: IconType;
  comboBoxList?: T[];
  value: string;
  canSubmitByInput?: boolean;
  onChangeValue: (value: string) => void;
}

const InputComboBox = <T extends { id: string; displayedKeyword: string }>({
  label,
  buttonType = 'none',
  buttonImage: ButtonImage,
  comboBoxList,
  value,
  canSubmitByInput = true,
  onChangeValue,
  ...props
}: InputComboBoxProps<T>) => {
  const {
    displayedValue,
    selectedIndex,
    isComboBoxOpen,
    setIsComboBoxOpen,
    inputRef,
    listRef,
    handleKeyDown,
    handleDisplayedInputChange,
  } = useComboBox({ items: comboBoxList, value, canSubmitByInput });

  useClickOutside(inputRef, () => setIsComboBoxOpen(false));

  return (
    <div className={S.Layout} ref={inputRef}>
      {label && <label className={S.Label}>{label}</label>}

      <Input
        {...props}
        className={S.Input}
        value={displayedValue}
        onKeyDown={handleKeyDown}
        onChange={(event) => {
          onChangeValue(event.target.value);
          handleDisplayedInputChange(event.target.value);
        }}
        buttonType={canSubmitByInput ? buttonType : 'button'}
        buttonImage={ButtonImage}
      />

      {comboBoxList && isComboBoxOpen && (
        <ComboBox comboBoxList={comboBoxList} selectedIndex={selectedIndex} ref={listRef} />
      )}
    </div>
  );
};

export default InputComboBox;
