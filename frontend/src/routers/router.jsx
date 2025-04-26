import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import SingleBook from "../pages/books/SingleBook";
// import PrivateRoute from "./PrivateRoute";
// import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UserDashboard from "../pages/dashboard/users/UserDashboard";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: "/",
            element: <Home/>,
        },
        // {
        //     path: "/about",
        //     element: <div>About</div>
        // },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/register",
          element: <Register/>
        },
        {
          path: "/books/:id",
          element: <SingleBook/>
        },
        {
          path: "/user-dashboard",
          element: <UserDashboard/>
          // <PrivateRoute><UserDashboard/></PrivateRoute>
        }
        
      ]
    },
    {
      path: "/admin",
      element: <AdminLogin/>
    },
    {
      path: "/dashboard",
      element:<DashboardLayout/>,
      //  <AdminRoute>
      //   <DashboardLayout/>
      // </AdminRoute>,
      children:[
        {
          path: "",
          element:<Dashboard/>
          //  <AdminRoute></AdminRoute>
        },
        {
          path: "add-new-book",
          element: <AddBook/>
          // <AdminRoute>
            
          // </AdminRoute>
        },
      ]
    }
  ]);

  export default router;