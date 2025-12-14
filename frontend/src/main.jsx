import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { Login } from './features/authentication/pages/Login/Login'
import { Signup } from './features/authentication/pages/Signup/Signup'
import { Resetpassword } from './features/authentication/pages/ResetPassword/Resetpassword'
import { VerifyEmail } from './features/authentication/pages/VerifyEmail/VerifyEmail'

import { AuthenticationContextProvider } from './features/authentication/contexts/AuthenticationContextProvider'
import { AuthenticationLayout } from './features/authentication/components/AuthenticationLayout/AuthenticationLayout'
import { ApplicationLayout } from './components/ApplicationLayout/ApplicationLayout'
import { Feed } from './features/feed/pages/Feed/Feed'
import { Profile } from './features/authentication/pages/Profile/Profile'

const router = createBrowserRouter([
  {
    element: <AuthenticationContextProvider />,
    children: [
      {
        path: "/",
        element: <ApplicationLayout />,
        children: [
          {
            index: true,
            element: <Feed />,
          },         
          {
            path: "messaging",
            element: <div>Messaging</div>,
          },
          {
            path: "notifications",
            element: <div>Notifications</div>,
          },
          {
            path: "profile/:id",
            element: <Profile />,
          },
          {
            path: "settings",
            element: <div>Settings & Privacy</div>,
          },
        ],
      },

      {
        path: "/authentication",
        element: <AuthenticationLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
          {
            path: "request-password-reset",
            element: <Resetpassword />,
          },
          {
            path: "verify-email",
            element: <VerifyEmail />,
          },
          {
            path: "profile/:id",
            element: <Profile />,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
