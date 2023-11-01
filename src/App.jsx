import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import AuthChecker from "./components/AuthChecker";
import routes from "./routes";
import "./firebase.config";

import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            route.protected ? (
              <AuthChecker>
                <route.component />
              </AuthChecker>
            ) : (
              <route.component />
            )
          }
        />
      ))}
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
