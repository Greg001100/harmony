import React from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home"
import { BrowserRouter, NavLink, Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { PrivateRoute } from "../utilities/routesUtil"

function Splash() {
  const token = useSelector(state => state.authentication.token);

  // if (token) {
  //   return (
  //     <BrowserRouter>
  //       <Home></Home>
  //     </BrowserRouter>
  //   )
  // }
  return (
    <>
      <h1>Harmony</h1>
      <div className="alert alert-primary" role="alert"></div>
      <nav>
        <ul>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>

      </nav>
    </>
  );
}

export default Splash;
