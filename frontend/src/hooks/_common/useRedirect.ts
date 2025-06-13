import { useNavigate } from 'react-router-dom';

interface RedirectOptions {
  condition: boolean;
  redirectPath: string;
}

const useRedirect = ({ condition, redirectPath }: RedirectOptions) => {
  const navigate = useNavigate();

  if (condition) {
    navigate(redirectPath, { replace: true });
    return true;
  }

  return false;
};

export default useRedirect;
