import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Home from "./pages/HomePage";
import Test from "./pages/TestPage";
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
    path: "/test",
    component: Test,
    name: "Test Page",
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
