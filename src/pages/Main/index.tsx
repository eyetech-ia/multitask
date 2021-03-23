import React,{useState} from 'react';

// import { Container } from './styles';
import { Layout, Menu, Button } from 'antd';
// import './styles.css';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const Main: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  function toggleCollapsed() {
    setCollapsed(!collapsed);
  }
  return (
    <Layout >
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
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
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {collapsed ? 'Fechado' : 'Aberto' }
      </Button>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
  );
}

export default Main;

