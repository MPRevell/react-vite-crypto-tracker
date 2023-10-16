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
import Header from "./components/Header";

import SearchParams from "./components/SearchParams";
import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="/" element={<SearchParams />} />
      <Route path="/test" element={<Test />} />
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
