import * as S from './Loading.css.ts';

interface LoadingProps {
  variant?: 'primary' | 'secondary';
}

const Loading = ({ variant = 'primary' }: LoadingProps) => {
  return (
    <div className={S.Loading}>
      <div className={S.Spinner[variant]} />
    </div>
  );
};

export default Loading;
