import * as S from './TextArea.css';
import { LabelProps, TextAreaMainProps } from './TextArea.type';

const Label = ({ children }: LabelProps) => {
  return <p className={S.Label}>{children}</p>;
};

const TextAreaMain = ({ children }: TextAreaMainProps) => {
  return (
    <div className={S.Layout}>
      {children}
      <textarea />
    </div>
  );
};

const TextArea = Object.assign(TextAreaMain, {
  Label: Label,
});

export default TextArea;
