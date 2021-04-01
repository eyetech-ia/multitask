import React, {
  useCallback, useRef, useState, useEffect,
} from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Form as AntForm, Table, Tag, Space, Row, Col, Modal, Popconfirm, Alert
} from 'antd';
import { FiPlus, FiTrash } from 'react-icons/fi';
import { PlusCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Input, Button } from '../../components';

import './styles.css';

import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface LocationFormData {
  name: string;
  email: string;
  password: string;
}

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
  const { addToast } = useToast();
  const history = useHistory();
  const [disabled, setDisabled] = useState(false);
  const [modal, showModal] = useState(false);
  const [locale, setLocale] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    api.get('locale').then(({ data }) => setLocale(data));
    setLoading(false);
  }, [locale]);

  const handleViaCep = async () => {
    const cepValue = formRef.current?.getFieldValue('zipCode');

    await axios.get(
      `https://viacep.com.br/ws/${cepValue}/json/`
    ).then((res) => {
      formRef.current?.setFieldValue('street', res.data.logradouro);
      formRef.current?.setFieldValue('neighborn', res.data.bairro);
      formRef.current?.setFieldValue('city', res.data.localidade);
      formRef.current?.setFieldValue('state', res.data.uf);
      setDisabled(true);
    }).catch((err) => {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      setAlertMessage('Erro, CEP não encontrado!');
      setDisabled(false);
    });
  };

  const handleSubmit = useCallback(
    async (data: LocationFormData, { reset }) => {
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

        await api.post('/locale', data);
        formRef.current?.reset();

        showModal((prevState) => !prevState);

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

  const handleModal = () => {
    showModal((prevState) => !prevState);
  };

  const columns = [
    {
      title: 'Local',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Endereço',
      dataIndex: 'street',
      key: 'street',
    },
    {
      title: 'Cidade',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Estado',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Ações',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="primary" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>Detalhes</Button>
          <Button type="primary">Editar</Button>
          <Popconfirm title="Você tem Certeza?" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
            <Button type="primary" danger>
              <FiTrash size={20} />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (

    <>
      <Row style={{ marginBottom: 10 }}>
        <Button type="primary" icon={<PlusCircleOutlined style={{ color: 'white' }} />} onClick={handleModal} size="middle">
          Cadastrar Local
        </Button>
        <Modal centered title="Cadastrar Local" visible={modal} footer={false} onCancel={() => showModal((prevState) => !prevState)}>
          <Form ref={formRef} onSubmit={handleSubmit}>
            {alert && <Alert message={alertMessage} type="error" closable showIcon /> }
            <AntForm.Item>
              <Input label="Nome" name="name" placeholder="Local" />
            </AntForm.Item>

            <AntForm.Item>
              <Input label="CEP" name="zipCode" type="number" placeholder="CEP" onBlur={handleViaCep} />
            </AntForm.Item>
            <AntForm.Item>
              <Input label="Rua" name="street" placeholder="Rua" disabled={disabled} />
            </AntForm.Item>

            <AntForm.Item>
              <Input label="Bairro" name="neighborn" placeholder="Bairro" disabled={disabled} />
            </AntForm.Item>
            <AntForm.Item>
              <Input label="Bairro" name="number" placeholder="Nº" />
            </AntForm.Item>
            <AntForm.Item>
              <Input label="Cidade" name="city" placeholder="Cidade" disabled={disabled} />
            </AntForm.Item>
            <AntForm.Item>
              <Input label="Estado" name="state" placeholder="Estado" disabled={disabled} />
            </AntForm.Item>
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          </Form>
        </Modal>
      </Row>
      <Row>
        <Col span={24}>
          <Table loading={loading} bordered dataSource={locale} columns={columns} />
        </Col>
      </Row>
    </>

  );
};

export default Location;
