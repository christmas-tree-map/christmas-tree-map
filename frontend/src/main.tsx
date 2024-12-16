import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LayoutVisibilityProvider } from './contexts/LayoutVisibilityContext';
import './styles/global.css';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
      // staleTime: 1000 * 60 * 5, // 개발 편의를 위해 주석처리합니다.
      // gcTime: 1000 * 60 * 10, // 개발 편의를 위해 주석처리합니다.
    },
  },
});
// async function enableMocking() {
//   if (process.env.NODE_ENV !== 'development') return;

//   const { worker } = await import('./mocks/browser');

//   return worker.start();
// }

// enableMocking().then(() =>
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <LayoutVisibilityProvider>
        <App />
      </LayoutVisibilityProvider>
    </QueryClientProvider>
  </StrictMode>,
);

//
