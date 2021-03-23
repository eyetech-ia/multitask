import {Input, Button} from '../../components';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

interface QuestsFormData {
  name: string;
  quest_id: string;
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

interface AskParams {
  id: string;
}
const Asks: React.FC = () =>  {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const [asks, setAsks] = useState<Quests[]>([]);
  const { id } = useParams<AskParams>();

  useEffect(() => {
    api.get(`ask/${id}`).then(({ data }) => setAsks(data));
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
        data.quest_id = id
        await api.post('/ask', data);

        history.push(`/quest`);

        addToast({
          type: 'success',
          title: 'Pergunta Cadastrada com Sucesso!',
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
         <h1>Cadastrar Pergunta no questionário</h1>
          <Input name="name" placeholder="Pergunta" />

          <Button type="submit">
            Salvar
          </Button>
        </Form>

        <div>
        <h1>Perguntas</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Código</th>
            <th scope="col">Pergunta</th>
          </tr>
        </thead>
        <tbody>
          {
            asks.map(item =>
              <tr key={item.id}>
                <th scope="col">{item.id}</th>
                <th scope="col">{item.name}</th>
              </tr>
            )
          }

        </tbody>
</table>

      </div>
        </Container>

  )
}

export default Asks;
