import React, { useState } from 'react';
import {
  Breadcrumb,
  Button,
  Col, Form as AntForm, Layout, Modal, Row, Table
} from 'antd';

import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../services/api';

const {
  Header, Content, Footer, Sider
} = Layout;

interface Messages {
  message: string;
}
export const Container = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center
  `;

const Activate: React.FC = () => {
  const [message, setMessages] = useState<Messages[]>([]);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  function handleSubmit() {
    const token = query.get('token');
    api.post('/activate-user', {
      token
    }).catch((res) => setMessages(res.data.message));
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '0 16px' }}>
        <div
          className="site-layout-background"
          style={{
            padding: 24, minHeight: 360, justifyContent: 'center', alignItems: 'center'
          }}
        >
          <Button onClick={() => handleSubmit()}>
            Ativar Cadastro
          </Button>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Bem Brasil Multiserviços ©2021 Desenvolvido Pela EyeTech </Footer>

    </Layout>
  );
};

export default Activate;
