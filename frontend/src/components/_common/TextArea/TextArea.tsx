import { IoIosWarning } from '@react-icons/all-files/io/IoIosWarning';
import useAutoResize from '@/hooks/_common/useAutoResize';
import { vars } from '@/styles/theme.css';
import * as S from './TextArea.css';
import { LabelProps, TextAreaMainProps } from './TextArea.type';

const Label = ({ label }: LabelProps) => {
  return <p className={S.LabelText}>{label}</p>;
};

const TextAreaMain = ({
  value,
  errorMessage,
  status = 'default',
  maxLength = 300,
  children,
  ...props
}: React.PropsWithChildren<TextAreaMainProps>) => {
  const { textAreaRef } = useAutoResize(value ?? '');

  return (
    <div className={S.Layout}>
      {children}
      <textarea className={S.Textarea[status]} value={value} maxLength={maxLength} ref={textAreaRef} {...props} />
      {status === 'error' && errorMessage && (
        <div className={S.ErrorMessage}>
          <IoIosWarning color={vars.colors.primary[800]} />
          <p className={S.ErrorMessageText}>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

const TextArea = Object.assign(TextAreaMain, {
  Label: Label,
});

export default TextArea;
