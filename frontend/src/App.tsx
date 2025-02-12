import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CourseDetail from '@/pages/Course/CourseDetail/CourseDetail';
import CourseMain from '@/pages/Course/CourseMain/CourseMain';
import GlobalErrorFallback from '@/pages/Error/GlobalErrorFallback/GlobalErrorFallback';
import Landing from '@/pages/Landing/Landing';
import Layout from '@/pages/Layout/Layout';
import MapMarkerSelector from '@/pages/MapMarkerSelector/MapMarkerSelector';
import TreeMap from '@/pages/TreeMap/TreeMap';
import FeedList from '@/components/Feed/FeedList/FeedList';

const App = () => {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        children: [
          {
            path: '',
            element: <Landing />,
          },
        ],
      },
      {
        path: '/map',
        element: <Layout />,
        children: [
          {
            path: '',
            element: <TreeMap />,
            children: [
              {
                path: ':treeId',
                element: <FeedList />,
              },
            ],
          },
          {
            path: 'select',
            element: <MapMarkerSelector />,
          },
        ],
      },
      {
        path: '/course',
        element: <Layout title="맞춤 코스 추천" isSticky={true} />,
        children: [
          {
            path: '',
            element: <CourseMain />,
          },
          {
            path: '/course/detail',
            element: <CourseDetail />,
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
