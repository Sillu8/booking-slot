import Layout from './Layout'
import React from 'react'
import {Col, Form, Input, Row} from 'antd'

function ApplicationPage() {

  return (
    <Layout>
      <h1 className='page-title'>Application Form</h1>

      <Form>
        <Row>
          <Col span={8} xs={24} sm={24} >
            <Form.Item label='Name' name='name' rules={[{required: true}]}>
              <Input placeholder='Name'/>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} >
            <Form.Item label='Name' name='name' rules={[{required: true}]}>
              <Input placeholder='Name'/>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} >
            <Form.Item label='Name' name='name' rules={[{required: true}]}>
              <Input placeholder='Name'/>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} >
            <Form.Item label='Name' name='name' rules={[{required: true}]}>
              <Input placeholder='Name'/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Layout>
  )
}

export default ApplicationPage