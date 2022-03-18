import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Divider, List, Row, Tag, Typography } from 'antd'
import { useHideMenu } from '../hooks/useHideMenu'
import { SocketContext } from '../context/SocketContext'
import { getQueueData } from '../helpers/getQueueData'

const {Title, Text} = Typography


export const Cola = () => {

  useHideMenu(true);

  const {socket}= useContext(SocketContext);

  const [tickets, setTickets] = useState(([]));

  useEffect(() => {
    //? ((en los use effects no se pueden usar async))
     const data = getQueueData().then( tickets => setTickets(tickets));
    //*  esto es lo mismo de arriba arg del callback es el mismo que en la funciion
    //? const data = getQueueData().then( setTickets);
  }, [])

  useEffect(() => {
  
      socket.on('ticket-asignado', (asignados) => {
        console.log(asignados);
        setTickets(asignados);
      })


    return () => {
      socket.off('ticket-asignado');
    }
  }, [socket])
  

  return (
    <>
      <Title level={1}>
        Atendiendo al Cliente
      </Title>

      <Row>
        <Col span={12}>
          <List 
            dataSource={tickets.slice(0,3)}
            renderItem={item => (
              <List.Item>
                <Card
                  style={{width: 300, marginTop: 16}}
                  actions={[
                    <Tag color="volcano">{item.agent}</Tag>,
                    <Tag color="magenta">{item.desk}</Tag>
                  ]}
                >
                  <Title
                    align="center"
                  >
                    No. {item.number}
                  </Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Divider>Historial</Divider>
          <List
            dataSource={tickets.slice(3)}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta 
                  title={`Ticket No. ${item.number}`}
                  description={
                    <>
                      <Text
                        type='secondary'
                      >En el escritorio: </Text>
                      <Tag
                        color="magenta"
                      >
                        { item.number }
                      </Tag>
                      <Text
                        type='secondary'
                      >
                        En el escritorio: </Text>
                      <Tag
                        color="volcano"
                      >
                        { item.agent }
                      </Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          >
          </List>
        </Col>
      </Row>
    </>
  )
}
