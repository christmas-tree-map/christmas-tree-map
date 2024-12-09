import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Error from '@/pages/Error/Error';
import Layout from '@/pages/Layout/Layout';
import TreeMap from '@/pages/TreeMap/TreeMap';

const App = () => {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
        children: [
          {
            path: '',
            element: <TreeMap />,
          },
        ],
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
