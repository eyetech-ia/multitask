import React, {
  useCallback, useRef, useState, useEffect,
} from 'react';
import {
  Table, Tag, Space, Row, Col, Button, Modal, Popconfirm, TableProps, Form as AntForm
} from 'antd';

import { FiPlus, FiTrash } from 'react-icons/fi';
import { PlusCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';
import { Input, Button as IButton } from '../../components';

import './styles.css';

interface QuestsFormData {
  name: string;
  email: string;
  password: string;
}
interface Quests {
  id: number;
  name: string;
  record: any;
  key: string;
  selectedRowKeys: void;
}
export const Container = styled.div`
  display: flex;
  flex:1;
  flex-direction:column;
`;

const Quests: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const [quests, setQuests] = useState<Quests[]>([]);
  const [modal, showModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    api.get('quest').then(({ data }) => setQuests(data));
    setLoading(false);
  }, [quests]);

  const handleModal = () => {
    showModal((prevState) => !prevState);
  };

  const handleModalSelection = () => {
    showModal((prevState) => !prevState);
  };

  const formRef = useRef<FormHandles>(null);

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

        showModal((prevState) => !prevState);

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

  interface Keys {
    record: Array<{
      key: string;
    }>;
    key: string;
    selectedRowKeys: any;
  }

  const selectRow = (record: Keys) => {
    console.log('red', record);
    // const selectedRowKeys: any = [...selectedKeys];
    // if (selectedRowKeys.indexOf(record.key) >= 0) {
    //   selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
    // } else {
    //   selectedRowKeys.push(record.key);
    // }
    // setSelectedKeys(selectedRowKeys);
  };
  const onSelectedRowKeysChange = (selectedRowKeys: any) => {
    console.log('sec', selectedRowKeys);
    setSelectedKeys(selectedRowKeys);
  };

  const columns = [
    {
      title: 'Nome do Questionário',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ações',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="primary">Editar</Button>
          <Button type="primary" onClick={handleModalSelection}>Ver Perguntas</Button>
          <Popconfirm title="Você tem Certeza?" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
            <Button type="primary" danger>
              <FiTrash size={20} />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedKeys,
    onChange: onSelectedRowKeysChange
  };

  return (
    <>
      <Row style={{ marginBottom: 10 }}>
        <Button type="primary" icon={<PlusCircleOutlined style={{ color: 'white' }} />} onClick={handleModal} size="middle">
          Cadastrar Questionário
        </Button>
        <Modal centered title="Cadastrar Questionário" visible={modal} footer={false} onCancel={() => showModal((prevState) => !prevState)}>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <AntForm.Item>
              <Input name="name" placeholder="Nome do Questionário" />
            </AntForm.Item>

            <IButton type="primary" htmlType="submit">Salvar</IButton>
          </Form>
        </Modal>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            loading={loading}
            rowSelection={rowSelection}
            bordered
            dataSource={quests}
            columns={columns}
            onRow={(record) => ({ onClick: () => selectRow(record) })}
          />
        </Col>
      </Row>
    </>
  );
};

export default Quests;
