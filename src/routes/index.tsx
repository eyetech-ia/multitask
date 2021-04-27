import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import {
  Activate, Main, SignIn, SignUp, Landing, Employee, Location, Quests
} from '../pages';
import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/cadastrar" component={SignUp} />
    <Route path="/ativar-cadastro" component={Activate} />
    <Route exact path="/" component={SignIn} />
    <Route path="/dashboard" component={Landing} isPrivate />
    <Route path="/funcionarios" component={Employee} isPrivate />
    <Route path="/locais" component={Location} isPrivate />
    <Route path="/questionarios" component={Quests} isPrivate />
  </Switch>
);

export default Routes;
