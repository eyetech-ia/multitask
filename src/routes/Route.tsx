import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect
} from 'react-router-dom';
import { TokenClass } from 'typescript';

import { useAuth } from '../hooks/auth';
import { Main } from '../pages';

interface IRouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<IRouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { token } = useAuth();

  const Layout = Main;

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        if (token && isPrivate) {
          return (
            <Layout>
              <Component />
            </Layout>
          );
        }

        return isPrivate === !!token ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};
export default Route;
