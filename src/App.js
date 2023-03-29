import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// importing the components
import RootLayout from "./components/rootLayout/RootLayout";
import ErrorPage from "./components/errorpage/ErrorPage";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import User from "./components/user/User";
import Login from "./components/login/Login";
import SuperAdmin from "./components/superadmin/SuperAdmin";
import RegisteredUsers from "./components/registeredsers/RegisteredUsers";
import Gdo from "./components/gdo/Gdo";
import Admin from "./components/admin/Admin";
import GetAllProjects from "./components/admin/GetAllProjects";
import ProjectDetailedView from "./components/admin/ProjectDetailedView";

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/register", element: <Register /> },
        // { path: "/login", element: <Login /> },
        { path: "/user", element: <User /> },
        { path: "/super-admin", element: <SuperAdmin /> },
        { path: "/registered-users", element: <RegisteredUsers /> },
        { path: "/gdo", element: <Gdo /> },

        {
          path: "/admin/projects",
          element: <Admin />,
          children: [
            {
              path: "",
              element: <GetAllProjects />,
            },

            {
              path: "project-detailed-view/:id",
              element: <ProjectDetailedView />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;
