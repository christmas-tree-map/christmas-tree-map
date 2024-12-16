import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from '@/pages/Layout/Layout';
import TreeMap from '@/pages/TreeMap/TreeMap';
import MapMarkerSelector from './pages/MapMarkerSelector/MapMarkerSelector';
import GlobalErrorFallback from './pages/Error/GlobalErrorFallback/GlobalErrorFallback';

const App = () => {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: '',
            element: <TreeMap />,
          },
          {
            path: 'select',
            element: <MapMarkerSelector />,
          },
        ],
      },
      { path: '*', element: <GlobalErrorFallback statusCode={404} /> },
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
