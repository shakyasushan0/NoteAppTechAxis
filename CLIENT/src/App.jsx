import {Navigate, RouterProvider, createBrowserRouter} from 'react-router-dom'
import Layout from './pages/Layout';
import Home from './pages/Home';
import AddNote from './pages/AddNote';
import Login from './pages/Login';
import Signup from './pages/Signup';
import useAuth from './hooks/useAuth';


export default function App(){
  const {user} = useAuth();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "",
          element: <Home/>
        },
        {
          path: "addnote",
          element: <AddNote/>
        },
        {
          path: "login",
          element: <Login/>
        },
        {
          path: "signup",
          element: <Signup/>
        }
      ]
    }
  ])
  return (
    
      <RouterProvider router={router}></RouterProvider>
   
  )
}