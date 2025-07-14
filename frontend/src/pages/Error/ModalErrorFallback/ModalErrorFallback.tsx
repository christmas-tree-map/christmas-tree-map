import Button from '@/components/_common/Button/Button';
import useDisplayedError from '@/hooks/_common/useDisplayedError';
import * as S from './ModalErrorFallback.css';

interface ModalErrorFallbackProps {
  statusCode: number;
  resetErrorBoundary: () => void;
}

const ModalErrorFallback = ({ statusCode, resetErrorBoundary }: ModalErrorFallbackProps) => {
  const { errorMessage, handleErrorButton } = useDisplayedError(statusCode, resetErrorBoundary);

  return (
    <div className={S.Layout}>
      <h1 className={S.TitleText}>{errorMessage.title}</h1>
      <Button onClick={handleErrorButton}>{errorMessage.buttonText}</Button>
    </div>
  );
};

export default ModalErrorFallback;
