import useAutoResize from '@/hooks/_common/useAutoResize';
import * as S from './TextArea.css';
import { LabelProps, TextAreaMainProps } from './TextArea.type';

const Label = ({ label }: LabelProps) => {
  return <p className={S.LabelText}>{label}</p>;
};

const TextAreaMain = ({
  children,
  onChange,
  value,
  errorMessage,
  status = 'default',
  maxLength = 300,
}: React.PropsWithChildren<TextAreaMainProps>) => {
  const { textAreaRef } = useAutoResize(value ?? '');

  return (
    <div className={S.Layout}>
      {children}
      <textarea
        className={S.Textarea[status]}
        onChange={onChange}
        value={value}
        maxLength={maxLength}
        ref={textAreaRef}
      />
      {/*  TODO: 에러 아이콘 추가 필요 */}
      {status === 'error' && errorMessage && <p className={S.ErrorMessage}>{errorMessage}</p>}
    </div>
  );
};

const TextArea = Object.assign(TextAreaMain, {
  Label: Label,
});

export default TextArea;
