import { useNavigate } from 'react-router-dom';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { displayErrorMessage } from '@/utils/displayErrorMessage';

const useDisplayedError = (statusCode: number) => {
  const errorMessage = displayErrorMessage(statusCode);
  const navigate = useNavigate();
  const { reset } = useQueryErrorResetBoundary();

  const handleErrorButton = () => {
    switch (errorMessage.action) {
      case 'navigateBack':
        navigate(-1);
        break;
      case 'retry':
        reset();
        break;
      case 'navigateHome':
        navigate('/');
        break;
    }
  };

  return { errorMessage, handleErrorButton };
};

export default useDisplayedError;
