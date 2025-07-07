import { createBrowserRouter } from "react-router";
import { lazy } from "react";

import { AppLayout } from "../shared/components/layout/AppLayout";
import { RequireUnauth } from "../modules/auth/components/RequireUnauth";
import { RequireAuth } from "../modules/auth/components/RequireAuth";
import Home from "../pages/Home";

const Login = lazy(() => import("../modules/auth/pages/Login"));
const Registration = lazy(() => import("../modules/auth/pages/Registration"));
const FullPost = lazy(() => import("../modules/posts/pages/FullPost"));
const PostEditor = lazy(() => import("../modules/posts/pages/PostEditor"));
const NotFound = lazy(() => import("../pages/NotFound"));

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <AppLayout></AppLayout>,
    children: [
      { index: true, element: <Home /> },
      {
        path: "login",
        element: (
          <RequireUnauth>
            <Login />
          </RequireUnauth>
        ),
      },
      {
        path: "register",
        element: (
          <RequireUnauth>
            <Registration />
          </RequireUnauth>
        ),
      },
      {
        path: "post/:id",
        element: <FullPost />,
      },
      {
        path: "post/:id/edit",
        element: (
          <RequireAuth>
            <PostEditor />
          </RequireAuth>
        ),
      },
      {
        path: "create_post",
        element: (
          <RequireAuth>
            <PostEditor />
          </RequireAuth>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
