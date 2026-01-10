import { createBrowserRouter } from "react-router";

//Auth views
import Login from "./auth/Login";
import Register from "./auth/Register";

//Dashboard Views
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Dashboard/Home";
import ManageStudent from "./pages/Librarian/ManageStudent";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "students",
        element: <ManageStudent />,
      },
    ],
  },
]);
export default router;
