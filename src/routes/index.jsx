/* eslint-disable react/display-name */
import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
// components
import LoadingScreen from "../components/LoadingScreen";
import MainLayout from "../layout/Main";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense
      fallback={<LoadingScreen isDashboard={pathname.includes("/dashboard")} />}
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { element: <PropertyPage />, path: "property/:id" },
        { element: <ReservationPage />, path: "reservation" },
        { element: <HostPage />, path: "host" },
        { element: <AdminPage />, path: "admin" },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "signup",
      element: <SignupPage />,
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

// IMPORT COMPONENTS

const HomePage = Loadable(lazy(() => import("../pages/Home")));
const PropertyPage = Loadable(lazy(() => import("../pages/Property")));
const LoginPage = Loadable(lazy(() => import("../pages/Login")));
const SignupPage = Loadable(lazy(() => import("../pages/Signup")));
const ReservationPage = Loadable(
  lazy(() => import("../pages/ReservationPage"))
);
const HostPage = Loadable(lazy(() => import("../pages/Host"))); 
const AdminPage = Loadable(lazy(() => import("../pages/Admin")));
