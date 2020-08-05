import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  path,
  component: Component,
  userId,
  componentProps,
}) => (
  <Route path={path} render={props =>
    userId ? (
      <Component {...props} {...componentProps} />
    ) : (
      <Redirect to="/login" />
    )}
  />
);
