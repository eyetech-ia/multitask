/* eslint-disable @typescript-eslint/no-empty-interface */
import React, {
  useCallback, useRef, useState, useEffect,
} from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Form as AntForm, Table, Tag, Space, Row, Col, Modal, Popconfirm, Alert, notification
} from 'antd';
import { FiPlus, FiTrash } from 'react-icons/fi';
import { PlusCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Input, Button } from '../../components';

import './styles.css';

import { getValidationErrors } from '../../utils';

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

interface Cep {
  logradouro: string ;
  bairro: string | undefined ;
  localidade: string ;
  uf: string ;
}

interface ILocale {
  id: string;
  name: string ;
  address: string;
  zipCode: string;
  city: string;
  state: string;
}

const Location: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const [disabled, setDisabled] = useState(false);
  const [modal, showModal] = useState(false);
  const [detailsModal, showDetailsModal] = useState(false);
  const [locale, setLocale] = useState<ILocale[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCep, setSelectedCep] = useState<Cep>();

  const [selectedRecord, setSelectedRecord] = useState<ILocale>();

  const formRef = useRef<FormHandles>(null);

  const fetchLocale = async () => {
    api.get('locale').then((res) => setLocale(res.data));
    setLoading(false);
  };
  useEffect(() => {
    fetchLocale();
  }, []);

  const handleViaCep = async () => {
    const cepValue = formRef.current?.getFieldValue('zipCode');
    setLoading(true);
    if (cepValue.length === 8) {
      try {
        setLoading(true);
        await axios.get(
          `https://viacep.com.br/ws/${cepValue}/json/`
        ).then((res) => {
          setSelectedCep(res.data);
          setDisabled(true);
        }).finally(() => {
          setLoading(false);
        });
      } catch (err) {
        notification.error({
          message: 'Erro!',
          description:
            'Cep não encontrado!',
        });
        setDisabled(false);
        setLoading(false);
      }
    } else {
      notification.error({
        message: 'Erro!',
        description:
          'Cep inválido, digite o padrão sem o traço!',
      });
    }
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

        notification.success({
          message: 'Sucesso!',
          description:
            'Local cadastrado com sucesso!',
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

  const handleDeleteRecord = (idRecord: string) => {
    api.delete(`locale/${idRecord}`).then(() => {
      notification.success({
        message: 'Sucesso!',
        description:
          'Item Removido!',
      });
    }).catch((err) => {
      notification.error({
        message: 'Erro!',
        description: err.message,
      });
    });
  };

  const handleShowDetails = (idRecord: string) => {
    showDetailsModal((prevState) => !prevState);
    api.get(`locale/${idRecord}`).then((res) => {
      setSelectedRecord(res.data);
    }).catch((err) => console.log('err', err));
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
      render: (_: string, record: ILocale) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleShowDetails(record.id)}>Detalhes</Button>

          {/* <Button type="primary">Editar</Button> */}
          <Popconfirm
            title="Você tem Certeza?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => handleDeleteRecord(record.id)}
          >
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
            <AntForm.Item>
              <Input label="Nome" name="name" placeholder="Local" />
            </AntForm.Item>

            <AntForm.Item>
              <Input label="CEP" name="zipCode" type="number" placeholder="CEP" searchable onSearch={handleViaCep} loading={loading} enterButton="Buscar Endereço" />
            </AntForm.Item>
            <AntForm.Item>
              <Input label="Rua" name="street" placeholder="Rua" disabled={disabled} value={selectedCep?.logradouro} />
            </AntForm.Item>
            <Row gutter={12}>
              <Col span={12}>
                <AntForm.Item label="Bairro">
                  <Input name="neighborn" placeholder="Bairro" disabled={disabled} value={selectedCep?.bairro} />
                </AntForm.Item>
              </Col>
              <Col span={12}>
                <AntForm.Item label="Número">
                  <Input name="number" placeholder="Nº" />
                </AntForm.Item>

              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <AntForm.Item>
                  <Input label="Cidade" name="city" placeholder="Cidade" disabled={disabled} value={selectedCep?.localidade} />
                </AntForm.Item>
              </Col>

              <Col span={12}>
                <AntForm.Item>
                  <Input label="Estado" name="state" placeholder="Estado" disabled={disabled} value={selectedCep?.uf} />
                </AntForm.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          </Form>
        </Modal>
        {selectedRecord && (
          <Modal centered title="Detalhes do Local" visible={detailsModal} footer={false} onCancel={() => showDetailsModal((prevState) => !prevState)}>
            <Row>
              <p>
                Local:
                {' '}
                {selectedRecord.name}
              </p>
            </Row>
            <Row>
              <p>
                Endereço:
                {' '}
                {selectedRecord.address}
              </p>
            </Row>
            <Row>

              <p>
                CEP:
                {' '}
                {selectedRecord.zipCode}
              </p>
            </Row>
          </Modal>
        )}
      </Row>
      <Row>
        <Col span={24}>
          <Table loading={loading} bordered dataSource={locale} columns={columns} rowKey="id" />
        </Col>
      </Row>
    </>

  );
};

export default Location;
