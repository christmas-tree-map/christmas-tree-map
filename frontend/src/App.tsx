import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CourseDetail from '@/pages/Course/CourseDetail/CourseDetail';
import CourseMain from '@/pages/Course/CourseMain/CourseMain';
import NotFoundPage from '@/pages/Error/NotFoundPage/NotFoundPage';
import Landing from '@/pages/Landing/Landing';
import Layout from '@/pages/Layout/Layout';
import MapMarkerSelector from '@/pages/MapMarkerSelector/MapMarkerSelector';
import TreeMap from '@/pages/TreeMap/TreeMap';
import FeedList from '@/components/Feed/FeedList/FeedList';
import GlobalErrorBoundary from './pages/Error/ErrorBoundary/GlobalErrorBoundary';
import SavedCourse from './pages/Course/SavedCourse/SavedCourse';

const App = () => {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        children: [
          {
            path: '',
            element: (
              <GlobalErrorBoundary>
                <Landing />
              </GlobalErrorBoundary>
            ),
          },
        ],
      },
      {
        path: '/map',
        element: (
          <GlobalErrorBoundary>
            <Layout />
          </GlobalErrorBoundary>
        ),
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
        element: (
          <GlobalErrorBoundary>
            <Layout title="맞춤 코스 추천" backgroundColor="white" isSticky={true} />
          </GlobalErrorBoundary>
        ),
        children: [
          {
            path: '',
            element: <CourseMain />,
          },
          {
            path: '/course/detail',
            element: <CourseDetail />,
          },
          {
            path: 'saved',
            element: <SavedCourse />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
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
