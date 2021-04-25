import React from 'react';
import { Switch } from 'react-router-dom';
import {
  Activate, Ask, Employee, Landing, Location, Main, Quests, SignIn, SignUp
} from '../pages';
import PrivateRoute from './Route';

const Routes: React.FC = () => (
  <Switch>
    <PrivateRoute exact path="/entrar" component={SignIn} />
    {/* <Redirect to="/login" /> */}
    <PrivateRoute path="/ativar-cadastro" component={Activate} />
    <PrivateRoute path="/cadastrar" component={SignUp} />

    <Main>
      <PrivateRoute exact path="/" component={Landing} isPrivate />
      <PrivateRoute path="/funcionarios" component={Employee} isPrivate />
      <PrivateRoute path="/locais" component={Location} isPrivate />
      <PrivateRoute path="/questionarios" component={Quests} isPrivate />
      <PrivateRoute path="/dashboard" component={Landing} isPrivate />
      <PrivateRoute path="/perguntas" component={Ask} isPrivate />
    </Main>

  </Switch>
);

export default Routes;
