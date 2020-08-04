import React from "react";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { BrowserRouter, NavLink, Switch, Route } from "react-router-dom";

import { AuthRoute, ProtectedRoute } from "./Routes.js";

function App() {
  return (
    <BrowserRouter>
      <h1>Harmony</h1>
      <div className="alert alert-primary" role="alert"></div>
      <nav>
        <ul>
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup">Sign up</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/users/:userId">Profile</NavLink>
          </li>
        </ul>
        <Switch>
          <AuthRoute path="/login" component={Login}></AuthRoute>
          <AuthRoute path="/signup" component={SignUp}></AuthRoute>
        </Switch>
      </nav>
    </BrowserRouter>
  );
}

export default App;
