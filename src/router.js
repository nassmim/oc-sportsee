import { createBrowserRouter } from "react-router-dom"

import App from "./App.js"
import Home from "./pages/Home.jsx"
import Profile from "./pages/Profile.jsx"
import Settings from "./pages/Settings.jsx"
import Community from "./pages/Community.jsx"
import Error from "./pages/Error.jsx"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/community",
        element: <Community />,
      },
    ],
  },
])
