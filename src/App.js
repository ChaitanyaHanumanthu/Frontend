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
import ProjectManager from "./components/projectmanager/ProjectManager";
import GetAllProjects from "./components/admin/GetAllProjects";
import ProjectDetailedView from "./components/admin/ProjectDetailedView";
import { useSelector } from "react-redux";
import CreateProject from "./components/admin/CreateProject";
import DetailedView from "./components/admin/DetailedView";

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
        // { path: "/login", element: <Login /> },
        { path: "/user", element: <User /> },
        { path: "/super-admin", element: <SuperAdmin /> },
        { path: "/registered-users", element: <RegisteredUsers /> },
        { path: "/gdo", element: <Gdo /> },
        { path: "/create-project", element: <CreateProject /> },
        {
          path: "/admin/projects",
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
          ],
        },
        {
          path: "/project-manager",
          element: <ProjectManager />,
          children: [
            {
              path: "",
              element: (
                <GetAllProjects
                  url={`http://localhost:8080/manager-api/project-manager/${userObj.userObj.userId}`}
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
