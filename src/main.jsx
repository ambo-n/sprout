import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import NewProject from "./pages/NewProject.jsx";
import EditPage from "./pages/EditPage.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";

import NavBar from "./components/NavBar.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/users", element: <UserPage /> },
      { path: "/projects", element: <NewProject /> },
      { path: "/project/:id", element: <ProjectPage /> },
      { path: "project/edit/:id", element: <EditPage /> },
      { path: "/dashboard", element: <UserDashboard /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
