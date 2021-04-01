import React, { useState } from 'react';
import {
  useHistory, useLocation, Route, Switch, Redirect
} from 'react-router-dom';
import {
  Layout, Button, Row, Col, Breadcrumb, PageHeader, Typography, Avatar
} from 'antd';
import { FaAlignCenter } from 'react-icons/fa';
import { Menu } from '../../components';

const {
  Header, Content, Sider, Footer
} = Layout;
const { Title } = Typography;

const Main: React.FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const newLocation = location.pathname.split('/');
  function toggleCollapsed() {
    setCollapsed(!collapsed);
  }
  return (
    <Layout className="App" style={{ minHeight: '100vh', overflow: 'auto' }}>
      <Header>
        <Button type="primary" onClick={toggleCollapsed}>
          {collapsed ? <FaAlignCenter /> : <FaAlignCenter /> }
        </Button>
      </Header>

      <Layout className="site-layout">
        <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
          <Menu />
        </Sider>
        <Content>
          {
            newLocation[0] === ''
              ? (
                <PageHeader
                  className="site-page-header firstLetter"
                  title={newLocation}
                >
                  <Breadcrumb separator=">">
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    {newLocation.map((item) => <Breadcrumb.Item key={item} className="firstLetter">{item}</Breadcrumb.Item>)}
                  </Breadcrumb>
                </PageHeader>
              )
              : (
                <PageHeader
                  className="site-page-header firstLetter"
                  title={newLocation}
                  onBack={() => history.goBack()}
                >
                  <Breadcrumb separator=">">
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    {newLocation.map((item) => <Breadcrumb.Item key={item} className="firstLetter">{item}</Breadcrumb.Item>)}
                  </Breadcrumb>
                </PageHeader>
              )
}
          <Row>
            <Col
              sm={24}
              className="mainApp"
            >
              {children}
            </Col>
          </Row>
          <Footer>
            <a href="https://www.eyetech.com">Desenvolvido pela Eyetech</a>
          </Footer>
        </Content>

      </Layout>
    </Layout>
  );
};

export default Main;
