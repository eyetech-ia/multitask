import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import "antd/dist/antd.css";

import GlobalStyle from './styles/global';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <Routes />
    </AppProvider>
  </Router>
);

export default App;
