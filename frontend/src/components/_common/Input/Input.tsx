import { IoIosWarning } from '@react-icons/all-files/io/IoIosWarning';
import { vars } from '@/styles/theme.css';
import * as S from './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  status?: 'default' | 'error';
  errorMessage?: string;
}

const Input = ({ label, status = 'default', errorMessage, ...props }: InputProps) => {
  return (
    <div className={S.Layout}>
      {label && <label className={S.Label}>{label}</label>}
      <input className={S.Input[status]} {...props} />
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
