// src/App.js
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import Assessment from "./pages/Assessment";
import JobApplication from "./pages/JobApplication";

function App() {
  // Define route paths as constants
  const ROUTES = {
    DASHBOARD: "/",
    CANDIDATES: "/candidates/:jobId",
    ASSESSMENT: "/assessment/:jobId",
    JOB_APPLICATION: "/jobapp"  
  };

  // Set up router configuration
  const router = createBrowserRouter([
    {
      path: ROUTES.DASHBOARD,
      element: <Dashboard />
    },
    {
      path: ROUTES.CANDIDATES,
      element: <Candidates />
    },
    {
      path: ROUTES.ASSESSMENT,
      element: <Assessment />
    },
    {
      path: ROUTES.JOB_APPLICATION,
      element: <JobApplication />
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
