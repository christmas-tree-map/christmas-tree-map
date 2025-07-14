import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import GlobalErrorFallback from '../GlobalErrorFallback/GlobalErrorFallback';

const GlobalErrorBoundary = ({ children }: React.PropsWithChildren) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <GlobalErrorFallback statusCode={error.statusCode} resetErrorBoundary={resetErrorBoundary} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default GlobalErrorBoundary;
