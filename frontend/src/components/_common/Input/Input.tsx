import { IoIosWarning } from '@react-icons/all-files/io/IoIosWarning';
import { IconType } from '@react-icons/all-files/lib';
import { vars } from '@/styles/theme.css';
import * as S from './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  status?: 'default' | 'error';
  errorMessage?: string;
  variant?: 'default' | 'dropdown';
  buttonType?: 'none' | 'button' | 'submit';
  buttonImage?: IconType;
}

const Input = ({
  label,
  status = 'default',
  errorMessage,
  buttonType = 'none',
  buttonImage: ButtonImage,
  variant = 'default',
  ...props
}: InputProps) => {
  return (
    <div className={S.Layout}>
      {label && <label className={S.Label}>{label}</label>}
      <div className={S.InputBox[status]}>
        <input className={S.Input} {...props} />
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
