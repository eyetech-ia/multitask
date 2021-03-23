import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './styles.css';
import { Menu, Button } from 'antd';
import admI from '../../assets/images/icons/adm.svg'
import funcI from '../../assets/images/icons/func.svg'
const { SubMenu } = Menu;
// import { Container } from './styles';

// const Landing: React.FC = () => {
//   return (<div id= "page-landing">
//   <div id="page-landing-content" className="container">
//       <div className= "logo-container">
//           <h2>Plataforma de Gerenciamento.</h2></div>

//       <div className = "buttons-container">
//           <Link to = "Adm" className = "Adm">
//           <img src = {admI} alt= "adm" />
//           ADMINISTRAÇÃO </Link>

//           <Link to = "Func" className = "Func">
//           <img src = {funcI} alt= "func" />
//           FUNCIONÁRIO </Link>

//       </div>
//       <span className = "bembrasil"> Rede Bem Brasil @ 2021</span>

//   </div>
// </div>);
// }

const Landing: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  function toggleCollapsed() {
    setCollapsed(!collapsed);
  }
  return (
    <div style={{ width: 256 }}>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {collapsed ? 'Fechado' : 'Aberto' }
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
      >
        <Menu.Item key="1" >
          Option 1
        </Menu.Item>
        <Menu.Item key="2" >
          Option 2
        </Menu.Item>
        <Menu.Item key="3" >
          Option 3
        </Menu.Item>
        <SubMenu key="sub1" title="Navigation One">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2"  title="Navigation Two">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    </div>
  );
}


export default Landing;
