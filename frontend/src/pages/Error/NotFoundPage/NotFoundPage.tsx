import { useNavigate } from 'react-router-dom';
import Button from '@/components/_common/Button/Button';
import { displayErrorMessage } from '@/utils/displayErrorMessage';
import * as S from './NotFoundPage.css';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const errorMessage = displayErrorMessage(404);

  const handleGoHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className={S.Layout}>
      <h1 className={S.TitleText}>{errorMessage.title}</h1>
      <Button onClick={handleGoHome} color="primary">
        홈으로 이동
      </Button>
    </div>
  );
};

export default NotFoundPage;
