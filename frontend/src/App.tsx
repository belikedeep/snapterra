import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import Login from "./pages/Login";
import Screenshots from "./pages/Screenshots";
import Links from "./pages/Links";
import MainLayout from "./components/MainLayout";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "screenshots",
        element: <Screenshots />,
      },
      {
        path: "links",
        element: <Links />,
      },
      {
        index: true,
        element: <Navigate to="/screenshots" replace />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
