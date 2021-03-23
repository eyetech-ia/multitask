import {Input, Button, Option} from '../../components';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

interface LocationFormData {
  name: string;
  email: string;
  password: string;
}

import './styles.css';
import Select from '../components/Select';
import Textarea from '../components/Textarea';

// import { Container } from './styles';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

interface ICep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

const Location: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    const [zipCode, setZipCode] = useState<ICep[]>([]);


    const handleSearchZip = (value: string) => {
      axios.get(`https://viacep.com.br/ws/${value}/json/`).then((res) =>  {
        setZipCode(res.data)
        console.log('cep', res.data)
      }).catch(err => console.log(err))
    }

    const handleSubmit = useCallback(
      async (data: LocationFormData) => {
        try {
          formRef.current?.setErrors({});

          const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            zipCode: Yup.string(),
            street: Yup.string().required('Rua obrigatória'),
            city: Yup.string().required('Cidade obrigatória'),
            neighborn: Yup.string().required('Bairro obrigatório'),

            number: Yup.string().required('Bairro obrigatório'),

          });

          await schema.validate(data, {
            abortEarly: false,
          });

          console.log('data', data)

          await api.post('/locale', data);

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
      <Input name="name" placeholder="Local" />
      <Input name="zipCode" placeholder="CEP" onBlur={(event) => handleSearchZip(event.target.value)} />
      <Input name="street" placeholder="Rua" />
      <Input name="city" placeholder="Cidade" />
      <Option name="state" label="Estado" options = {[
      {value: 'Maranhão', label: 'Maranhão'},
      {value: 'Rio Grande do Sul', label: 'Rio Grande do Sul'},
      {value: 'São Paulo', label: 'São Paulo'},
      ]} />
      <Input name="neighborn" placeholder="Bairro" />
      <Input name="number" placeholder="Nº" />

      <Button type="submit">
        Salvar
      </Button>
      </Form>
    </Container>
  );
}

export default Location;


