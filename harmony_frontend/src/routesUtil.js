import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  path,
  component: Component,
  token,
  componentProps,
}) => (
  <Route path={path} render={props =>
    token ? (
      <Component {...props} {...componentProps} />
    ) : (
      <Redirect to="/login" />
    )}
  />
);
