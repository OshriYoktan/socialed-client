import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { SocialApp } from './pages/SocialApp/SocialApp';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { App } from './App';
import { UserProfile } from './pages/UserProfile/UserProfile';



const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />

  },
  {
    path: "/feed",
    element: <SocialApp />,

  },
  {
    path: "/feed/user/:id",
    element: <UserProfile />,

  },


]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <RouterProvider router={router}>
      <App />
      </RouterProvider>
    </React.StrictMode>
);

