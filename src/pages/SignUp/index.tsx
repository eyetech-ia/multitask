import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { Input } from '../../components';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import './styles.css';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

// import { Container } from './styles';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon no MultiAction',
        });
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
    },
    [addToast, history],
  );

  return (
    <div id="page-form-login" className="container">
      <main>
        <footer>
          <fieldset>
            <Form ref={formRef} onSubmit={() => { console.log('okja'); }}>
              <legend>Solicitar Acesso</legend>
              <Input name="name" placeholder="Nome" />
              <Input name="email" type="email" placeholder="Digite seu email" />
              <Input name="cargo" placeholder="Cargo" />
              <legend />
              <button type="button">
                ENVIAR
              </button>

            </Form>

          </fieldset>

        </footer>

        <footer>
          <p>
            Aguarde!
            {' '}
            <br />
            Você receberá um EMAIL de confirmação!
          </p>

        </footer>

      </main>
    </div>
  );
};

export default SignUp;
