import React, { useState } from 'react'

import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useHideMenu } from '../hooks/useHideMenu';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';
import { Redirect } from 'react-router-dom';

const {Title, Text} = Typography;

export const Ingresar = () => {

  useHideMenu(false);

  const history = useHistory();
  const [usuario] = useState(getUsuarioStorage());

  const onFinish = ({agent, escritorio}) => {
    console.log('Success:', agent, escritorio);
    localStorage.setItem('agente', agent);
    localStorage.setItem('escritorio', escritorio );
    history.push('/escritorio')
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if(usuario.agente && usuario.escritorio){
    return <Redirect to="/escritorio" />
  }

  return (
    <>
    <Title level={2}>Ingresar</Title>
    <Text>Ingrese su nombre y numero de escritorio</Text>
    <Divider />
      <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 14,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
        <Form.Item
          label="Nombre del agente"
          name="agent"
          rules={[
            {
              required: true,
              message: 'Por Favor ingrese su nombre',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Escritorio"
          name="escritorio"
          rules={[
            {
              required: true,
              message: 'Ingrese un numero válido de ecritorio',
            },
          ]}
        >
          <InputNumber
            min={1} max={99}
          />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <Button 
            type="primary" 
            htmlType="submit"
            shape='round'
          >
            <FileSearchOutlined />
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </>
    
  )
}
