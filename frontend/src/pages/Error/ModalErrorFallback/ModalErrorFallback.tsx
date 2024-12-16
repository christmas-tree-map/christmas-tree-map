import Button from '@/components/_common/Button/Button';
import useDisplayedError from '@/hooks/_common/useDisplayedError';
import * as S from './ModalErrorFallback.css';

interface ModalErrorFallbackProps {
  statusCode: number;
}

const ModalErrorFallback = ({ statusCode }: ModalErrorFallbackProps) => {
  const { errorMessage, handleErrorButton } = useDisplayedError(statusCode);

  return (
    <div className={S.Layout}>
      <h1 className={S.TitleText}>{errorMessage.title}</h1>
      <Button onClick={handleErrorButton}>{errorMessage.buttonText}</Button>
    </div>
  );
};

export default ModalErrorFallback;
