import React from "react";
import { Route, Redirect } from "react-router-dom";

// export const PrivateRoute = ({
//   path,
//   component: Component,
//   token,
//   componentProps,
// }) => (
//   <Route path={path} render={props =>
//     token ? (
//       <Component {...props} {...componentProps} />
//     ) : (
//       <Redirect to="/login" />
//     )}
//   />
// );

// export const PrivateRoute = ({ component: Component, ...rest }) => {
//   debugger
//   return (<Route
//     {...rest}
//     render={(props) =>
//       rest.token ? <Component {...props} /> : <Redirect to="/login" />
//     }
//   />);

// };

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.needLogin === true
      ? <Redirect to='/login' />
      : <Component {...props} />
  )} />
)
