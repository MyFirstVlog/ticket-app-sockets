import React from 'react'
import { Card, Col, Divider, List, Row, Tag, Typography } from 'antd'
import { ficticiousData } from '../resource/data'
import { useHideMenu } from '../hooks/useHideMenu'

const {Title, Text} = Typography


export const Cola = () => {

  useHideMenu(true);

  return (
    <>
      <Title level={1}>
        Atendiendo al Cliente
      </Title>

      <Row>
        <Col span={12}>
          <List 
            dataSource={ficticiousData.slice(0,3)}
            renderItem={item => (
              <List.Item>
                <Card
                  style={{width: 300, marginTop: 16}}
                  actions={[
                    <Tag color="volcano">{item.agente}</Tag>,
                    <Tag color="magenta">{item.escritorio}</Tag>
                  ]}
                >
                  <Title
                    align="center"
                  >
                    No. {item.ticketNo}
                  </Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Divider>Historial</Divider>
          <List
            dataSource={ficticiousData.slice(3)}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta 
                  title={`Ticket No. ${item.ticketNo}`}
                  description={
                    <>
                      <Text
                        type='secondary'
                      >En el escritorio: </Text>
                      <Tag
                        color="magenta"
                      >
                        { item.ticketNo }
                      </Tag>
                      <Text
                        type='secondary'
                      >
                        En el escritorio: </Text>
                      <Tag
                        color="volcano"
                      >
                        { item.agente }
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
