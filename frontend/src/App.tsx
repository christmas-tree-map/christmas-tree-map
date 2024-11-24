import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import TreeMap from '@/pages/TreeMap/TreeMap';

const App = () => {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <TreeMap />,
      },
    ],
    {
      future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    },
  );

  return <RouterProvider router={router} future={{ v7_startTransition: true }} />;
};

export default App;
