import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import GlobalErrorFallback from './GlobalErrorFallback';

const GlobalErrorBoundary = ({ children }: React.PropsWithChildren) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ error }) => <GlobalErrorFallback statusCode={error.statusCode} />}
    >
      {children}
    </ErrorBoundary>
  );
};

export default GlobalErrorBoundary;
