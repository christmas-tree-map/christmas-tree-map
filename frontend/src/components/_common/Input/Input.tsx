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
      {status === 'error' && errorMessage && <p className={S.ErrorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default Input;
