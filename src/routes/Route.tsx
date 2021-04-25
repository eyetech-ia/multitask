import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const PrivateRoute: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}: RouteProps) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => (isPrivate === !!user ? (

        <Component />

      ) : (
        <Redirect
          to={{
            pathname: isPrivate ? '/entrar' : '/dashboard',
            state: { from: location },
          }}
        />
      ))}
    />
  );
};

export default PrivateRoute;
