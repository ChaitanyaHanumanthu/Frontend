import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// importing the components
import RootLayout from "./components/rootLayout/RootLayout";
import ErrorPage from "./components/errorpage/ErrorPage";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import User from "./components/user/User";
import SuperAdmin from "./components/superadmin/SuperAdmin";
import RegisteredUsers from "./components/registeredsers/RegisteredUsers";
import Gdo from "./components/gdo/Gdo";
import Admin from "./components/admin/Admin";
import ProjectManager from "./components/projectmanager/ProjectManager";
import GetAllProjects from "./components/admin/GetAllProjects";
import { useSelector } from "react-redux";
import CreateProject from "./components/admin/CreateProject";
import DetailedView from "./components/admin/DetailedView";
import ResourceRequests from "./components/admin/ResourceRequests";
import ForgotPassword from "./components/login/ForgotPassword";

function App() {
  let userObj = useSelector((state) => state.login);
  console.log(userObj, "from App");

  // token
  let token = sessionStorage.getItem("token");

  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,

      children: [
        { path: "/", element: <Home /> },
        { path: "/register", element: <Register /> },
        { path: "/forgot-password", element: <ForgotPassword /> },

        // { path: "/login", element: <Login /> },
        { path: "/user", element: <User /> },
        { path: "/super-admin", element: <SuperAdmin /> },
        { path: "/registered-users", element: <RegisteredUsers /> },
        // { path: "/gdo", element: <Gdo /> },

        {
          path: "/admin",
          element: <Admin />,
          children: [
            {
              path: "",
              element: (
                <GetAllProjects
                  url={"http://localhost:8080/admin-api/projects"}
                  api="admin-api"
                />
              ),
            },

            {
              path: "detailed-view/:id",
              element: <DetailedView />,
            },
            { path: "add-project", element: <CreateProject /> },
            { path: "resource-requests", element: <ResourceRequests /> },
          ],
        },

        // Project Manager
        {
          path: "/project-manager",
          element: <ProjectManager />,
          children: [
            {
              path: "",
              element: (
                <GetAllProjects
                  url={`http://localhost:8080/manager-api/project-manager/project/${userObj.userObj.userId}`}
                  api="manager-api"
                />
              ),
            },
            {
              path: "detailed-view/:id",
              element: <DetailedView />,
            },
          ],
        },

        // Gdo
        {
          path: "/gdo",
          element: <Gdo />,
          children: [
            {
              path: "",
              element: (
                <GetAllProjects
                  url={`http://localhost:8080/gdo-api/gdo/${userObj.userObj.userId}/projectPortfolioDashboard`}
                  api="gdo-api"
                />
              ),
            },
            { path: "detailed-view/:id", element: <DetailedView /> },
            // {
            //   path: "add-team",
            //   element: (
            //     <AddTeamMembers
            //       url={`http://localhost:8080/gdo-api/gdo/${userObj.userObj.userId}/add-team`}
            //     />
            //   ),
            // },
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
