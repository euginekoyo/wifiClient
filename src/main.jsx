import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Layout from "./Layout/Layout.jsx";
import Notification from "./pages/notification.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/logout", element: <Login /> }, // Redirect to login page on logout
      { path: "admin/dashboard", element: <AdminDashboard /> },
      {
        path: "layout",
        element: <Layout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "notification", element: <Notification /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
