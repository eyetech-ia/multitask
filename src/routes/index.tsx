import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  SignUp, SignIn, Quests, Location, Employee, Landing, Ask, Main, Activate
} from '../pages';
import PrivateRoute from './Route';

const Routes: React.FC = () => (
  <Switch>
    <PrivateRoute exact path="/login" component={SignIn} />
    {/* <Redirect to="/login" /> */}
    <PrivateRoute path="/ativar-cadastro" component={Activate} />

    <Main>
      <PrivateRoute exact path="/" component={Landing} isPrivate />

      <PrivateRoute path="/funcionarios" component={Employee} />
      <PrivateRoute path="/locais" component={Location} isPrivate />
      <PrivateRoute path="/questionarios" component={Quests} isPrivate />
      <PrivateRoute path="/dashboard" component={Landing} isPrivate />
      <PrivateRoute path="/signup" component={SignUp} isPrivate />
      <PrivateRoute path="/perguntas" component={Ask} isPrivate />
    </Main>

  </Switch>
);

export default Routes;
