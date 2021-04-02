import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from './Route';
import {
  SignUp, SignIn, Quests, Location, Employee, Landing, Ask, Main
} from '../pages';

const Routes: React.FC = () => (
  <Switch>
    <PrivateRoute exact path="/login" component={SignIn} />

    {/* <PrivateRoute exact path="/" component={Landing} isPrivate /> */}
    <PrivateRoute path="/funcionarios" component={Employee} isPrivate />
    <PrivateRoute path="/locais" component={Location} isPrivate />
    <PrivateRoute path="/questionarios" component={Quests} isPrivate />
    <PrivateRoute path="/dashboard" component={Landing} isPrivate />
    <PrivateRoute path="/signup" component={SignUp} isPrivate />
    <PrivateRoute path="/perguntas" component={Ask} isPrivate />
  </Switch>
);

export default Routes;
