import Button from '@/components/_common/Button/Button';
import useDisplayedError from '@/hooks/_common/useDisplayedError';
import * as S from './GlobalErrorFallback.css';

interface GlobalErrorFallbackProps {
  statusCode: number;
}

const GlobalErrorFallback = ({ statusCode }: GlobalErrorFallbackProps) => {
  const { errorMessage, handleErrorButton } = useDisplayedError(statusCode);

  return (
    <div className={S.Layout}>
      <h1 className={S.TitleText}>{errorMessage.title}</h1>
      <Button onClick={handleErrorButton} color="primary">
        {errorMessage.buttonText}
      </Button>
    </div>
  );
};

export default GlobalErrorFallback;
