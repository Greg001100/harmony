import React, {useEffect, useState} from "react";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home"
import { BrowserRouter, NavLink, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {loadToken, loadUser} from './actions/authentication'

import { PrivateRoute } from "./utilities/routesUtil.js";
import Splash from "./components/Splash";

function App() {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);
  const needLogin = useSelector(state => !state.authentication.token);


  useEffect(() => {
    setLoaded(true);
    dispatch(loadToken());
  }, []);

  if(!loaded){
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/home/" needLogin={needLogin} component={Home}></PrivateRoute>
        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={SignUp}></Route>
        <Route exact path="/" component={Splash}></Route>
      </Switch>
    </BrowserRouter>
  )

}

export default App;
