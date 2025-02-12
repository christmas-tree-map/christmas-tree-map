import { IoIosWarning } from '@react-icons/all-files/io/IoIosWarning';
import { IconType } from '@react-icons/all-files/lib';
import { vars } from '@/styles/theme.css';
import * as S from './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  status?: 'default' | 'error';
  errorMessage?: string;
  buttonType?: 'none' | 'button' | 'submit';
  buttonImage?: IconType;
}

const Input = ({
  label,
  status = 'default',
  errorMessage,
  buttonType = 'none',
  buttonImage: ButtonImage,
  ...props
}: InputProps) => {
  return (
    <div className={S.Layout}>
      {label && <label className={S.Label}>{label}</label>}
      <div className={S.InputBox[status]}>
        <input {...props} className={S.Input} />
        {buttonType !== 'none' && ButtonImage && (
          <button className={S.Button} type={buttonType}>
            <ButtonImage color={vars.colors.grey[900]} size={25} />
          </button>
        )}
      </div>
      {status === 'error' && errorMessage && (
        <div className={S.ErrorMessage}>
          <IoIosWarning color={vars.colors.primary[800]} />
          <p className={S.ErrorMessageText}>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
