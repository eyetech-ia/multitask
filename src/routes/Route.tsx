import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';
import { Main } from '../pages';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const PrivateRoute: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}: RouteProps) => {
  const { token } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => (isPrivate === !!token ? (

        <Component />

      ) : (
        <Redirect
          to={{
            pathname: isPrivate ? '/login' : '/dashboard',
            state: { from: location },
          }}
        />
      ))}
    />
  );
};

export default PrivateRoute;
