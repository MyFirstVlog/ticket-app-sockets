import { ArrowRightOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Row, Typography } from 'antd'
import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { SocketContext } from '../context/SocketContext'
import { getUsuarioStorage } from '../helpers/getUsuarioStorage'
import { useHideMenu } from '../hooks/useHideMenu'

const {Text, Title} = Typography


export const Escritorio = () => {
  useHideMenu(false);
  const [usuario] = useState(getUsuarioStorage());
  const {socket} = useContext(SocketContext);
  const [ticket, setTicket] = useState(null)
  const history = useHistory();

  const salir = () => {
    localStorage.clear();
    history.replace('/ingresar');
  }
  
  const siguienteTicket = () => {
    console.log('me ejecuto',usuario)
    socket.emit('siguiente-ticket-trabajar', usuario, (ticket) => {
      console.log({ticket})
      setTicket(ticket);
    })
  }

  if(!usuario.agente || !usuario.escritorio){
    return <Redirect to="/ingresar" />
  }
  
  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{usuario.agente}</Title>
          <Text>Usted esta trabajando en el escritorio: </Text>
          <Text type='success'>{usuario.escritorio}</Text>
        </Col>
        <Col span={4} align="right">
          <Button
            shape='round'
            type='danger'
            onClick={salir}
          >
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>

      <Divider />

      {
        ticket && (
          <Row>
            <Col>
              <Text>Esta atendiendo el ticket numero: </Text>
              <Text 
                style={{fontSize: 30}} 
                type='danger'
              >
                {ticket.number}
              </Text>
            </Col>
          </Row>
        )
      }


      <Row>
        <Col offset={18} span={6} align="right">
          <Button
            onClick={siguienteTicket}
            type="primary"
            shape="round"
          >
            <ArrowRightOutlined />
            Siguiente:
          </Button>
        </Col>
      </Row>
    </>
  )
}
