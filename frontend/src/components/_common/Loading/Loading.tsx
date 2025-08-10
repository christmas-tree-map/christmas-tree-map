import * as S from './Loading.css.ts';

interface LoadingProps {
  variant?: 'primary' | 'secondary';
  fullScreen?: boolean;
}

const Loading = ({ variant = 'primary', fullScreen = false }: LoadingProps) => {
  return (
    <div className={S.Loading[fullScreen ? 'fullScreen' : 'default']}>
      <div className={S.Spinner[variant]} />
    </div>
  );
};

export default Loading;
