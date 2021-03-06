import React, { useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { Form as AntForm } from 'antd';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import {
  Button, Input, Option, MaskedInput
} from '../../components';
import {
  AnimationContainer, Background, Container, Content,
} from './styles';

/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
import api from '../../services/api';

interface EmployeeFormData {
  name: string;
  email: string;
  password: string;
  cpf: string;
  cargo: string;
  locale_id: string;
}

interface ILocale {
  id: string;
  name: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [locale, setLocale] = useState<ILocale[]>([]);
  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    api.get('locale').then((res) => {
      setLocale(
        res.data.map((loc: ILocale) => ({
          label: loc.name,
          value: loc.id,
        })),
      );
    });
  }, [locale]);

  async function handleSubmit(data: EmployeeFormData) {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        cpf: Yup.string().required('CPF Obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        cargo: Yup.string().required('Cargo Obrigatório'),
        locale_id: Yup.string().required('Local Obrigatório'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // eslint-disable-next-line no-console
      await api.post('/users', data).catch((response) => console.log('res', response));
      addToast({
        type: 'success',
        title: 'Cadastro realizado!',
        description: 'Verifique seu email para ativar o cadastro',
      });
      history.push('/');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
      });
    }
  }

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Bem Brasil | Multiaction</h1>
            <AntForm.Item>
              <Input label="Nome" name="name" type="text" placeholder="Nome Completo" />
            </AntForm.Item>
            <AntForm.Item>
              <MaskedInput label="CPF" name="cpf" mask="111.111.111-11" placeholder="000.000.000-00" />
            </AntForm.Item>
            <AntForm.Item>
              <Input label="Email" name="email" type="email" placeholder="Digite seu Email" />
            </AntForm.Item>
            <AntForm.Item>
              <Input label="Senha" name="password" type="password" placeholder="Digite sua senha" min={6} />
            </AntForm.Item>
            <AntForm.Item>
              <Input
                name="birthdate"
                type="date"
                placeholder="Digite a data do seu Nascimento"
              />
            </AntForm.Item>
            <AntForm.Item>
              <Option
                name="cargo"
                label="Cargo"
                options={[
                  { value: 'Preposto', label: 'Preposto' },
                  { value: 'Fiscal', label: 'Fiscal' },
                  { value: 'Supervisor', label: 'Supervisor' },
                ]}
              />
            </AntForm.Item>
            <AntForm.Item>
              <Option
                name="locale_id"
                label="Local"
                options={locale}
              />
            </AntForm.Item>

            <Button type="primary" htmlType="submit">Solicitar Acesso</Button>

          </Form>

        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
