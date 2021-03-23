import {Input, Button, Option} from '../../components';
import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Select from '../components/Select';
import styled from 'styled-components';
interface EmployeeFormData {
  name: string;
  email: string;
  password: string;
  cpf:string;
  cargo: string;
  locale_id: string;
}
import './styles.css';

export const Container = styled.div`
  flex:1;
  flex-direction: column;
`;



const Employee: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(

      async (data: EmployeeFormData) => {
        console.log('data', data)
        try {
          formRef.current?.setErrors({});

          const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            cpf: Yup.string().required('CPF Obrigatório'),
            email: Yup.string()
              .required('E-mail obrigatório')
              .email('Digite um e-mail válido'),
            cargo: Yup.string()
              .required('Cargo Obrigatório'),
            locale_id: Yup.string()
              .required('Local Obrigatório'),
            password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          console.log('data', data)
          await api.post('/users', data);

          history.push('/');

          addToast({
            type: 'success',
            title: 'Cadastro realizado!',
            description: 'Funcionário Cadastrado',
          });
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);

            console.log(err)
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
   <Container className="container">
     <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Cadastrar Funcionário</h1>
          <Input name="name" placeholder="Nome Completo" />
          <Input name="cpf" placeholder="Digite seu CPF" />
          <Input name="email" type="email" placeholder="Digite seu Email" />
          <Input name="password" type="password" placeholder="Digite sua senha" />
          <Input name="birthdate" type="date" placeholder="Digite a data do seu Nascimento" />
          <Option name="cargo" label="Cargo" options = {[
                {value: 'Supervisor', label: 'Supervisor'},
                {value: 'Preposto', label: 'Preposto'},
                {value: 'Fiscal', label: 'Fiscal'},
                {value: 'Funcionário', label: 'Funcionário'},
            ]} />
            <Option name="locale_id" label="Local" options = {[
                {value: '1', label: 'JUSTIÇA FEDERAL DE 1º GRAU SEÇÃO JUDICIÁRIA DO MARANHÃO (AREINHA/CENTRO)'},
                {value: 'JFJ_HOLANDESES', label: 'JUSTIÇA FEDERAL DE 1º GRAU SEÇÃO JUDICIÁRIA DO MARANHÃO (HOLANDESES)'},
            ]} />

          <Button type="submit">Cadastrar</Button>
        </Form>
   </Container>
  );
}

export default Employee;


