import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import Landing from './pages/Landing/Landing.tsx';

async function enableMocking() {
  return;
  // if (process.env.NODE_ENV !== 'development') {
  //   return;
  // }

  // const { worker } = await import('./mocks/browser');

  // // `worker.start()` returns a Promise that resolves
  // // once the Service Worker is up and ready to intercept requests.
  // return worker.start();
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Landing />,
      },
    ],
  },
]);

enableMocking().then(() =>
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  ),
);
