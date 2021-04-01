/* eslint-disable camelcase */
import React, {
  useCallback, useRef, useState, useEffect
} from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import {
  Table, Space, Row, Col, Modal, Button, Popconfirm, Form as AntForm
} from 'antd';
import { FiTrash } from 'react-icons/fi';
import { PlusCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import { Input, Button as IButton, Option } from '../../components';
import './styles.css';

interface EmployeeFormData {
  name: string;
  email: string;
  password: string;
  cpf: string;
  cargo: string;
  locale_id: string;
}

const Employee: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const [modal, showModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [locale, setLocale] = useState([]);
  const [employee, setEmployee] = useState<EmployeeFormData[]>([]);

  useEffect(() => {
    api.get('users').then(({ data }) => setEmployee(data));
    setLoading(false);

    api.get('locale').then((res) => {
      setLocale(
        res.data.map((loc : any) => ({
          label: loc.name,
          value: loc.id,
        })),
      );
    });
  }, [employee]);
  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(
    async (data: EmployeeFormData) => {
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

        await api.post('/users', data);
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

          console.log(err);
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
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Cargo',
      dataIndex: 'cargo',
      key: 'cargo',
    },
    {
      title: 'Local',
      dataIndex: 'locale_id',
      key: 'locale_id',
    },
    {
      title: 'Ações',
      key: 'action',
      render: () => (
        <Space size="middle">
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
          Cadastrar Funcionário
        </Button>
        <Modal centered title="Cadastrar Funcionário" visible={modal} footer={false} onCancel={() => showModal((prevState) => !prevState)}>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <AntForm.Item>
              <Input label="Nome" name="name" type="text" placeholder="Nome Completo" />
            </AntForm.Item>
            <AntForm.Item>
              <Input label="CPF" name="cpf" type="text" placeholder="Digite seu CPF" />
            </AntForm.Item>
            <AntForm.Item>
              <Input label="Email" name="email" type="email" placeholder="Digite seu Email" />
            </AntForm.Item>
            <AntForm.Item>
              <Input label="Senha" name="password" type="password" placeholder="Digite sua senha" />
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
                  { value: 'Supervisor', label: 'Supervisor' },
                  { value: 'Preposto', label: 'Preposto' },
                  { value: 'Fiscal', label: 'Fiscal' },
                  { value: 'Funcionário', label: 'Funcionário' },
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

            <IButton htmlType="submit">Cadastrar</IButton>
          </Form>
        </Modal>
      </Row>
      <Row>
        <Col span={24}>
          <Table loading={loading} bordered dataSource={employee} columns={columns} />
        </Col>
      </Row>
    </>
  );
};

export default Employee;
