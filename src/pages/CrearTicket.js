import { DownloadOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd'
import React, { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext';
import { useHideMenu } from '../hooks/useHideMenu';

const {Title, Text} = Typography;

export const CrearTicket = () => {

  useHideMenu(true);

  const {socket} = useContext(SocketContext);

  const [lastTicket, setLastTicket] = useState(null)

  const nuevoTicket = () => {
    //* Tercer arg es un callback que se ejecuta cuando el backend quiera
    socket.emit('solicitar-ticket',null, (ticket) => {
      console.log(ticket)
      setLastTicket(ticket);
    });
  }

  return (
    <>
      <Row>
        <Col span={14} offset={6}  align="center">
          <Title level={3}>
            Presione el botón para generar un nuevo ticket
          </Title>

          <Button
            type='primary'
            shape='round'
            icon={<DownloadOutlined />}
            size="large"
            onClick={nuevoTicket}
          >
            Nuevo Ticket
          </Button>
        </Col>
      </Row>

      {lastTicket && (
        <Row style={{marginTop: 100}}>
          <Col span={14} offset={6} align="center">
            <Text level={2}>
              Su numero
            </Text>
            <br />
            <Text type='success' style={{fontSize: 55}}>
              {lastTicket.number}
            </Text>
          </Col>
        </Row>
      )}
    </>
  )
}
