import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from '@/pages/Layout/Layout';
import TreeMap from '@/pages/TreeMap/TreeMap';
import FeedList from '@/components/Feed/FeedList/FeedList';
import FeedSubmit from '@/components/Feed/FeedSubmit/FeedSubmit';
import Error from './components/_common/Error/Error';

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
            children: [
              {
                path: 'feeds',
                element: <FeedList />,
                errorElement: <Error />,
              },
              {
                path: 'submit',
                element: <FeedSubmit />,
                errorElement: <Error />,
              },
            ],
            errorElement: <Error />,
          },
        ],
        errorElement: <Error />,
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
