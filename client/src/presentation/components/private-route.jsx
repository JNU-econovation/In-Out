import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          ></Redirect>
        )
      }
    ></Route>
  );
};

export { PrivateRoute };
