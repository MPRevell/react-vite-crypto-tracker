import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/HomePage";
import Test from "./pages/TestPage";
import About from "./pages/AboutPage";
import Navbar from "./components/shared/Navbar";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import "./firebase.config";

import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route index element={<Home />} />
      <Route path="/about/:coin" element={<About />} />
      <Route path="/test" element={<Test />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Route>
  )
);

function App({ routes }) {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
