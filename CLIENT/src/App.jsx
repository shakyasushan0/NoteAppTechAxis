import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import AddNote from "./pages/AddNote";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import useAuth from "./hooks/useAuth";
import MyPost from "./pages/MyPost";

export default function App() {
  const { user } = useAuth();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: user ? <Home /> : <Navigate to="/login" />,
        },
        {
          path: "addnote",
          element: user ? <AddNote /> : <Navigate to="/login" />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "mynotes",
          element: <MyPost />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}
