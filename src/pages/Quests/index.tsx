/* eslint-disable camelcase */
import React, {
  useCallback, useRef, useState, useEffect,
} from 'react';
import {
  Table, Tabs, Space, Row, Col, Button, Modal, Popconfirm, Switch, Form as AntForm, notification
} from 'antd';

import { FiPlus, FiTrash } from 'react-icons/fi';
import { PlusCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';
import { Input, Button as IButton } from '../../components';
import './styles.css';

const { TabPane } = Tabs;

interface QuestsFormData {
  name: string;
}

interface AskFormData {
  name: string;
  quest_id: string;
}

interface Asks {
  id: string;
  name: string;
  quest_id: string;
}

interface Quests {
  id: string;
  name: string;
  record: any;
  key: string;
  quest_id: string;
  children: Asks[];
  selectedRowKeys: void;
}

const Quests: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const [quests, setQuests] = useState<Quests[]>([]);
  const [modal, showModal] = useState(false);
  const [modalItemSelection, setModalItemSelection] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Quests[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<string>();
  useEffect(() => {
    api.get('quest').then(({ data }) => setQuests(data));
    setLoading(false);
  }, [quests]);

  const handleModal = () => {
    showModal((prevState) => !prevState);
  };

  const handleModalSelection = async (idRecord: string) => {
    setModalItemSelection((prevState) => !prevState);
    setSelectedRecord(idRecord);
    api.get(`ask/${idRecord}`)
      .then((res) => setSelectedItem(res.data));
  };

  const handleDeleteQuest = async (idRecord: string) => {
    await api.delete(`quest/${idRecord}`).then(() => {
      notification.success({
        message: 'Sucesso!',
        description:
            'Item Removido!',
      });
    });
  };

  const handleDeleteAsk = async (idRecord?: string) => {
    await api.delete(`ask/${idRecord}`).then(() => {
      notification.success({
        message: 'Sucesso!',
        description:
            'Item Removido!',
      });
    });
  };
  useEffect(() => {
    handleDeleteAsk();
  }, [selectedItem]);

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

  const handlesubmitAsk = useCallback(
    async (data: AskFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/ask', data);

        setModalItemSelection((prevState) => !prevState);

        notification.success({
          message: 'Sucesso!',
          description:
              'Pergunta cadastrada com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        notification.error({
          message: 'Erro!',
          description:
              'Erro no cadastro!',
        });
      }
    },
    [],
  );

  const columns = [
    {
      title: 'Nome do Questionário',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_: string, record: Quests) => (
        <Space size="middle">
          {/* <Button type="primary">Editar</Button> */}
          <Button type="primary" onClick={() => handleModalSelection(record.id)}>Ver Perguntas</Button>
          <Popconfirm title="Você tem Certeza?" icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={() => handleDeleteQuest(record.id)}>
            <Button type="primary" danger>
              <FiTrash size={20} />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const askHeader = [
    {
      title: 'Questionário',
      dataIndex: 'quest_id',
      key: 'quest_id',
    },
    {
      title: 'Pergunta',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_: string, record: Asks) => (
        <Space size="middle">
          {/* <Button type="primary">Editar</Button> */}
          <Popconfirm title="Você tem Certeza?" icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={() => handleDeleteAsk(record.id)}>
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

        <Modal centered title={`Perguntas do Questionário ${selectedRecord}`} visible={modalItemSelection} footer={false} onCancel={() => setModalItemSelection((prevState) => !prevState)}>
          <Col span={24}>
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={(
                  <span>
                    Perguntas
                  </span>
                )}
                key="1"
              >
                <Table
                  loading={loading}
                  bordered
                  dataSource={selectedItem}
                  columns={askHeader}
                  rowKey="id"
                />
              </TabPane>
              <TabPane
                tab={(
                  <span>
                    <PlusCircleOutlined />
                    Adicionar Pergunta
                  </span>
                )}
                key="2"
              >
                <Form ref={formRef} onSubmit={handlesubmitAsk}>
                  <AntForm.Item>
                    <Input name="name" placeholder="Pergunta" />
                    <Input name="quest_id" type="hidden" value={selectedRecord} disabled />
                  </AntForm.Item>
                  <IButton type="primary" htmlType="submit">Salvar</IButton>
                </Form>
              </TabPane>
            </Tabs>

          </Col>
        </Modal>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            loading={loading}
            bordered
            dataSource={quests}
            columns={columns}
            rowKey="id"
          />
        </Col>
      </Row>
    </>
  );
};

export default Quests;
