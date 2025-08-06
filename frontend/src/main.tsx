import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LayoutVisibilityProvider } from './contexts/LayoutVisibilityContext';
import GlobalErrorBoundary from './pages/Error/ErrorBoundary/GlobalErrorBoundary';
import './styles/global.css';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
      retry: 0,
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
    },
  },
});

async function enableMocking() {
  // if (process.env.NODE_ENV === 'development') return;
  if (process.env.NODE_ENV !== 'development') return;

  const { worker } = await import('./mocks/browser');

  return worker.start();
}

enableMocking().then(() =>
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <GlobalErrorBoundary>
          <ReactQueryDevtools initialIsOpen={true} />
          <LayoutVisibilityProvider>
            <App />
          </LayoutVisibilityProvider>
        </GlobalErrorBoundary>
      </QueryClientProvider>
    </StrictMode>,
  ),
);
