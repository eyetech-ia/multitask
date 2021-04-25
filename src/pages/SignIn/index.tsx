import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { Form as AntdForm, Typography } from 'antd';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import { Input, Button } from '../../components';
import {
  Container, Content, AnimationContainer, Background,
} from './styles';

const { Text } = Typography;

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        }).catch((response) => {
          addToast({
            type: 'error',
            title: 'Erro na autenticação',
            description: response.response.data.message,
          });
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Rede BEM BRASIL</h1>

            <AntdForm.Item>
              <Input name="email" icon={FiMail} placeholder="E-mail" />
            </AntdForm.Item>
            <AntdForm.Item>
              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
              />
            </AntdForm.Item>

            <Button type="primary" htmlType="submit">Entrar</Button>

            <Link to="/esqueci-a-senha"><Text>Esqueci minha senha</Text></Link>

            <Link to="/cadastro"><Text>Solicitar Acesso</Text></Link>
          </Form>

        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
