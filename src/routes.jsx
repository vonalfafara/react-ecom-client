import Home from "./views/Home/Home";
import Profile from "./views/Profile/Profile";
import Store from "./views/Store/Store";
import Login from "./views/Login/Login";
import Registration from "./views/Registration/Registration";

export const navRoutes = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
  },
  {
    path: "/store",
    name: "Store",
    element: <Store />,
  },
];

export const authRoutes = [
  {
    path: "/login",
    name: "Login",
    element: <Login />,
  },
  {
    path: "/register",
    name: "Register",
    element: <Registration />,
  },
];

export const profileRoute = {
  path: "/profile",
  name: "Profile",
  element: <Profile />,
};

const routes = [...navRoutes, ...authRoutes, profileRoute];

export default routes;
