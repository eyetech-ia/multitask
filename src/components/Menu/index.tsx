import React, { useState } from 'react';
import {
  FiLayers, FiSquare, FiUsers, FiMapPin
} from 'react-icons/fi';
import {
  Menu as IMenu
} from 'antd';

import { Link } from 'react-router-dom';

const Menu: React.FC = () => {
  const [options] = useState([
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <FiSquare />,
    },
    {
      name: 'Questionários',
      path: '/questionarios',
      icon: <FiLayers />
    },
    {
      name: 'Funcionários',
      path: '/funcionarios',
      icon: <FiUsers />
    },
    {
      name: 'Locais',
      path: '/locais',
      icon: <FiMapPin />
    },

  ]);
  return (
    <IMenu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      {options.map((item) => (
        <IMenu.Item key={item.name} icon={item.icon}>
          <Link to={item.path}>{item.name}</Link>
        </IMenu.Item>
      ))}
    </IMenu>
  );
};

export default Menu;
