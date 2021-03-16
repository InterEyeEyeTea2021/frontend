import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
// Use like Route
export default function PrivateRoute(props: any) {
  let auth = useAuth();
  let { children, user_type, ...rest } = props;
  let render = (
    <Redirect
      to={{
        pathname: "/login",
      }}
    />
  );

  if (auth !== null && auth.user) {
    if (user_type !== undefined) {
      if (auth.user.user_type === user_type) {
        render = props.children;
      } else {
        render = (
          <Redirect
            to={{
              pathname: "/dashboard",
            }}
          />
        );
      }
    } else {
      render = props.children;
    }
  }

  return <Route {...rest} render={({ location }) => render} />;
}
