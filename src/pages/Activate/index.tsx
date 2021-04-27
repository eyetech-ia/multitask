import React, { useState } from 'react';
import { Button, Layout, notification } from 'antd';

import { useLocation, useHistory } from 'react-router-dom';
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
  const history = useHistory();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  function handleSubmit() {
    const token = query.get('token');
    api.post('/activate-user', {
      token
    }).then(() => {
      notification.success({
        message: 'Sucesso!',
        description: 'Email validado com sucesso!, aguarde, redirecionando para o login',
      });
      setTimeout(() => {
        history.push('/');
      }, 3000);
    }).catch((res) => {
      notification.error({
        message: 'Erro!',
        description:
          res.response.data.message,
      });
      setTimeout(() => {
        history.push('/');
      }, 3000);
    });
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
