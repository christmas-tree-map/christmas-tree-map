import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import ModalErrorFallback from './ModalErrorFallback';

const ModalErrorBoundary = ({ children }: React.PropsWithChildren) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} fallbackRender={({ error }) => <ModalErrorFallback statusCode={error.statusCode} />}>
      {children}
    </ErrorBoundary>
  );
};

export default ModalErrorBoundary;
