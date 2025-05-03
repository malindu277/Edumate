// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';
import Loadable from 'src/layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));
const HomeLayout = Loadable(lazy(() => import('../layouts/home/HomeLayout')));
const AdminLayout = Loadable(lazy(() => import('../layouts/admin/AdminLayout')));

// HomePage
const HomePage = Loadable(lazy(() => import('../views/course/CoursesPage')));
const CourseView = Loadable(lazy(() => import('../views/course/CourseViewPage')));

// Dashboard
// const Dashboard = Loadable(lazy(() => import('../views/dashboards/Dashboard')));

// authentication
const Login = Loadable(lazy(() => import('../views/auth/login/Login')));
const Register = Loadable(lazy(() => import('../views/auth/register/Register')));
const Logout = Loadable(lazy(() => import('../views/auth/logout/Logout')));
const Error = Loadable(lazy(() => import('../views/auth/error/Error')));

// admin
const ViewAllCourses = Loadable(lazy(() => import('../views/admin/ViewAllCourses')));
const ViewAllPurchases = Loadable(lazy(() => import('../views/admin/ViewAllPurchases')));

const Router = [
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      { path: '/', exact: true, element: <HomePage /> },
      { path: '/course/:id', exact: true, element: <CourseView /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      // { path: '/admin', exact: true, element: <Dashboard /> },
      { path: '/admin/courses', exact: true, element: <ViewAllCourses /> },
      { path: '/admin/purshases', exact: true, element: <ViewAllPurchases /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/login', exact: true, element: <Login /> },
      { path: '/register', exact: true, element: <Register /> },
      { path: '/logout', exact: true, element: <Logout /> },
      { path: '/404', element: <Error /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];

const router = createBrowserRouter(Router, { basename: '/' });
export default router;
