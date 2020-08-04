import React from 'react';
import RegistrationForm from './components/Register';
import {BrowserRouter, NavLink, Switch, Route} from 'react-router-dom';



import {AuthRoute, ProtectedRoute} from './Routes.js';

function App() {
  return (
    <div>
      <h1>Harmony</h1>
      <nav>
        <ul>
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/users/:userId">Profile</NavLink>
          </li>
        </ul>
        <Switch>
          <AuthRoute path="/register" component={RegistrationForm}></AuthRoute>
        </Switch>
      </nav>
    </div>
  );
}

export default App;
