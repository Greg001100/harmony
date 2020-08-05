import React from "react";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home"
import { BrowserRouter, NavLink, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { PrivateRoute } from "./routesUtil.js";

function App() {
  const token = useSelector(state => state.authentication.token);

  return (
    <BrowserRouter>
      <h1>Harmony</h1>
      <div className="alert alert-primary" role="alert"></div>
      <nav>
        <ul>
          <li>
            <NavLink exact to="/home">
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
          <PrivateRoute path="/home" exact={true} token={token} component={Home}></PrivateRoute>
          <Route path="/login" component={Login}></Route>
          <Route path="/signup" component={SignUp}></Route>
        </Switch>
      </nav>
    </BrowserRouter>
  );
}

export default App;
