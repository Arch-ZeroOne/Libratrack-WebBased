import { createBrowserRouter } from "react-router-dom";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import StudentStats from "./views/student/StudentStats";
import StudentLayout from "./views/layout/StudentLayout";
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
    path: "/student",
    element: <StudentLayout />,
    children: [
      {
        index: true,
        element: <StudentStats />,
      },
    ],
  },
]);

export default router;
