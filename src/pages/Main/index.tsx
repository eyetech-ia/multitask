import React, { useState } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { Menu } from '../../components';
import './styles.css';
import logo from '../../assets/images/logo-bem-brasil.png';

const {
  Header, Content, Footer, Sider
} = Layout;

const Main: React.FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const handleOnCollapse = () => {
    setCollapsed((prevState) => !prevState);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={handleOnCollapse}>
        <div className="logo">
          <img src={logo} alt="Bem Brasil" />
        </div>
        <Menu />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Bem Brasil Multiserviços ©2021 Desenvolvido Pela EyeTech </Footer>
      </Layout>
    </Layout>
  );
};

export default Main;
