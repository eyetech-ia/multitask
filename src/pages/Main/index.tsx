import React, { useState } from 'react';
import {
  Layout, Breadcrumb, Dropdown, Avatar, Menu as AntMenu, Row, Col
} from 'antd';

import { UserOutlined, DownOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Menu, ProfileMenu } from '../../components';

import './styles.css';
import logo from '../../assets/images/logo-bem-brasil.png';

const {
  Header, Content, Footer, Sider
} = Layout;

const StyledMenu = styled('span')`
  user-select: none;
  cursor: pointer;
`;

const StyledProfileMenu = styled(StyledMenu)`
  background: #fff;
  height: 100%;
  display: inline-block;
  padding: 0 5px;
`;

const StyledUserFullname = styled('span')`
  margin-right: 5px;
`;

const StyledUserActions = styled('div')`
  background: #fff;
  margin-right: 10px;
  float: right;

  @media only screen and (max-width: 320px) {
    background: #000;
    color: #fff;
  }

  @media only screen and (max-width: 780px) {
    display: none;
  }
`;

const Item = styled.div`
  margin-right: 20px;
`;

const DropMenu = () => (
  <Menu>
    <AntMenu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    </AntMenu.Item>
    <AntMenu.Item icon={<DownOutlined />} disabled>
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    </AntMenu.Item>
    <AntMenu.Item disabled>
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    </AntMenu.Item>
    <AntMenu.Item danger>a danger item</AntMenu.Item>
  </Menu>
);

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
        <Header className="site-layout-background" style={{ padding: 0 }}>

          <Row justify="end">
            <Item>
              <Dropdown overlay={<DropMenu />} trigger={['click', 'hover']}>
                <StyledProfileMenu>
                  <Avatar shape="circle" icon={<UserOutlined />} style={{ marginRight: 5 }} />
                  <StyledUserFullname>Administrador</StyledUserFullname>
                  <DownOutlined style={{ marginLeft: 15 }} />
                </StyledProfileMenu>
              </Dropdown>
            </Item>
          </Row>

        </Header>
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
