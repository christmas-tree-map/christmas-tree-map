import { useNavigate } from 'react-router-dom';
import { displayErrorMessage } from '@/utils/displayErrorMessage';

const useDisplayedError = (statusCode: number, resetErrorBoundary: () => void) => {
  const errorMessage = displayErrorMessage(statusCode);
  const navigate = useNavigate();

  const handleErrorButton = () => {
    switch (errorMessage.action) {
      case 'navigateBack':
        navigate(-1);
        break;
      case 'retry':
        resetErrorBoundary();
        break;
      case 'navigateHome':
        navigate('/');
        break;
    }
  };

  return { errorMessage, handleErrorButton };
};

export default useDisplayedError;
