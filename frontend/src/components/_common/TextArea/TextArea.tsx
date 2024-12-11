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
}: React.PropsWithChildren<TextAreaMainProps>) => {
  return (
    <div className={S.Layout}>
      {children}
      <textarea className={S.Textarea[status]} onChange={onChange} value={value} />
      {/*  TODO: 에러 아이콘 추가 필요 */}
      {status === 'error' && errorMessage && <p className={S.ErrorMessage}>{errorMessage}</p>}
    </div>
  );
};

const TextArea = Object.assign(TextAreaMain, {
  Label: Label,
});

export default TextArea;
