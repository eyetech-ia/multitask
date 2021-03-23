import {Input, Button} from '../../components';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

interface QuestsFormData {
  name: string;
  email: string;
  password: string;
}
interface Quests {
  id: number;
  name: string;
}
import styled from 'styled-components';
export const Container = styled.div`
  display: flex;
  flex:1;
  flex-direction:column;
`;

import './styles.css';


const Quests: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    const [quests, setQuests] = useState<Quests[]>([]);

    useEffect(() => {
      api.get('quest').then(({ data }) => setQuests(data));
    }, []);


    const handleSubmit = useCallback(
      async (data: QuestsFormData) => {
        try {
          formRef.current?.setErrors({});

          const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          await api.post('/quest', data);

          history.push('/adm');

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
    <Container className="container">




       <Form ref={formRef} onSubmit={handleSubmit}>
         <h1>Cadastrar Questionário</h1>
          <Input name="name" placeholder="Nome do Questionário" />

          <Button type="submit">
            Salvar
          </Button>
        </Form>

        <div>
        <h1>Questionários</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Questionário</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            quests.map(item =>
              <tr key={item.id}>
                <th scope="col">{item.id}</th>
                <th scope="col">{item.name}</th>
                <th>
                  <Link
                    to={`/asks/${item.id}`}
                    key={item.id}
                  >Ver Perguntas</Link>
                </th>
              </tr>
            )
          }

        </tbody>
</table>

      </div>
    </Container>
  );
}

export default Quests;


