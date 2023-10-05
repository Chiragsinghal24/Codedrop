import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import './index.css'
import Landing from './pages/Landing.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Create from './pages/Create.jsx';
import CDpreview from './pages/CDpreview.jsx';
import Drawer from './components/Drawer.jsx';
import Edit from './pages/Edit';

const router = createBrowserRouter([
  {
    path:"/landing",
    element:<Landing />,
  },
  {
    path:"/signup",
    element:<Signup />,
  },
  {
    path:"/login",
    element:<Login />,
  },
  {
    path:"/public/:id",
    element:<CDpreview />,
  },
  {
    path: "/",
    element: <Drawer />,
    children:[
      {
        index:true,
        element:<Dashboard/>
      },
      {
        path:"/create",
        element:<Create />
      },
      {
        path:":id",
        element:<CDpreview />
      },
      {
        path:"edit/:id",
        element:<Edit />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);