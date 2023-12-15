import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "../App";
import Home from "../Pages/Home";
import MyWork from '../Pages/MyWork'
import EditWork from "../Pages/EditWork";
import {
  createBrowserRouter,
} from "react-router-dom";
import CreateJob from "../Pages/CreateJob";
import Login from "../Pages/Login";
const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
            path:"/",element:<Home/>
        },
        {
          path:"/create-job",element:<CreateJob/>
        },
        {
          path:"/my-work",element:<MyWork/>
        },
        {
          path:"/edit-work/:id",
          element:<EditWork/>,
          loader:({params})=>fetch(`http://localhost:3000/all-works/${params.id}`)
        },
        {
          path:"/login",element:<Login/>
        }
      ]
    },
  ]);

export default router;