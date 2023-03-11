import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// pages
import App from './pages/App'
import Details from './pages/detail'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/detail",
    element: <Details/>,
  },
  {
    path: "/detail/:id",
    element: <Details/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
