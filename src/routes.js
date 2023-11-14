import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Home from "./pages/HomePage";
import Watchlist from "./pages/WatchlistPage";
import About from "./pages/AboutPage";

const routes = [
  {
    path: "",
    component: Home,
    name: "Home Page",
    protected: false,
  },

  {
    path: "/about/:coin",
    component: About,
    name: "About Page",
    protected: false,
  },

  {
    path: "/watchlist",
    component: Watchlist,
    name: "Watchlist Page",
    protected: true,
  },

  {
    path: "/signin",
    component: Signin,
    name: "Login Screen",
    protected: false,
  },
  {
    path: "/signup",
    component: Signup,
    name: "Sign up Screen",
    protected: false,
  },
];

export default routes;
