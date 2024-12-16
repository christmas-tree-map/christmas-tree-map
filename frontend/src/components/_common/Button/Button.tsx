import * as S from './Button.css';

type ButtonColor = 'primary' | 'secondary' | 'default';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
}

const Button = ({ color = 'default', children, ...props }: React.PropsWithChildren<ButtonProps>) => {
  return (
    <button type="button" className={S.Layout[color]} {...props}>
      {children}
    </button>
  );
};

export default Button;
