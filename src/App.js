import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import { tokenLoader, checkAuthLoader } from "./util/auth";
import AuthenticationPage, {
  action as athAction,
} from "./pages/Authentication/Authentication";
import { initialStateLoader } from "./util/twitter-db-handler";
import ErrorPage from "./pages/Error";
import { action as addFollowerAction } from "./pages/actions/addFollower";
import { action as removeEventAction } from "./pages/actions/removeFollower";
import { action as postMessageAction } from "./pages/actions/postMessage";
import { action as logoutAction } from "./pages/actions/logout";

initialStateLoader();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage />, loader: checkAuthLoader },
      {
        path: "welcome",
        element: <AuthenticationPage />,
        action: athAction,
      },
      {
        path: "addFollower",
        action: addFollowerAction,
      },
      {
        path: "removeFollower",
        action: removeEventAction,
      },
      {
        path: "postMessage",
        action: postMessageAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
