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

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      // errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/register", element: <Register /> },
        // { path: "/login", element: <Login /> },
        { path: "/user", element: <User /> },
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
