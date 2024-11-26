import * as S from './TextArea.css';
import { LabelProps, TextAreaMainProps } from './TextArea.type';

const Label = ({ label }: LabelProps) => {
  return <p className={S.LabelText}>{label}</p>;
};

const TextAreaMain = ({ children, onChange, value }: React.PropsWithChildren<TextAreaMainProps>) => {
  return (
    <div className={S.Layout}>
      {children}
      <textarea className={S.Textarea} onChange={onChange} value={value} />
    </div>
  );
};

const TextArea = Object.assign(TextAreaMain, {
  Label: Label,
});

export default TextArea;
