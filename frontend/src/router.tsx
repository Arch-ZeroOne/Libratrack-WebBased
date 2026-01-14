import { createBrowserRouter } from "react-router";

//Auth views

import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";

//Dashboard Views
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Dashboard/Home";
import ManageStudent from "./pages/Librarian/ManageStudent";
import Calendar from "./pages/Calendar";
import FormElements from "./pages/Forms/FormElements";
import AddNewStudent from "./components/form/librarian/AddNewStudent";

//Student QR Views

import QrCode from "./components/qr/QrCode";
import ScanQR from "./components/qr/ScanQR";
const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
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
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "form-elements",
        element: <FormElements />,
      },
      {
        path: "add-student",
        element: <AddNewStudent />,
      },
      {
        path: "student-qr",
        element: <QrCode />,
      },
      {
        path: "scan-qr",
        element: <ScanQR />,
      },
    ],
  },
]);
export default router;
