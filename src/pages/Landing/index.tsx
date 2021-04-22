import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { Menu, Button } from 'antd';
import Plot from 'react-plotly.js';
import admI from '../../assets/images/icons/adm.svg';
import funcI from '../../assets/images/icons/func.svg';

const Landing: React.FC = () => (
  <div id="page-landing">
    <div id="page-landing-content" className="container">
      <div className="logo-container">
        <h2>Plataforma de Gerenciamento Administrativo.</h2>
      </div>

      <span className="bembrasil"> Rede Bem Brasil @ 2021</span>

    </div>
  </div>
);

export default Landing;
