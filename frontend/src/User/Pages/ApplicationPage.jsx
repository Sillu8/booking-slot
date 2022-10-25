import Layout from './Layout'
import React from 'react'
import { Col, Form, Input, Row, Button } from 'antd'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../../Redux/alertSlice'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


function ApplicationPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.user)
  const onFinish = values => {
    try {
      (async () => {
        dispatch(showLoading())
        const response = await axios.post('/booking', { values }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
        });
        if (response.data.success) {
          dispatch(hideLoading())
          toast.success("Hurray");
          navigate('/home')
        } else {
          dispatch(hideLoading())
          console.log('some error');
        }
      })();
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
    }
  }
  return (

    <Layout>
      <h1 className='page-title text-center'>Application Form</h1>
      {user?.appId ?
        <div >
          <h2 className='pt-5 text-center'>You have already applied.</h2>
        </div>
        :
      
      <Form layout='vertical' onFinish={onFinish}>
        <Row>
          <Col span={10} xs={24} sm={24} lg={10} style={{ padding: '0 10px' }}>
            <Form.Item label='Name' name='name' rules={[{ required: true }]}>
              <Input placeholder='Name' />
            </Form.Item>
          </Col>
          <Col span={10} xs={24} sm={24} lg={10} style={{ padding: '0 10px' }}>
            <Form.Item label='Address' name='address' rules={[{ required: true }]}>
              <Input placeholder='Address' />
            </Form.Item>
          </Col>
          <Col span={10} xs={24} sm={24} lg={10} style={{ padding: '0 10px' }}>
            <Form.Item label='City' name='city' rules={[{ required: true }]}>
              <Input placeholder='City' />
            </Form.Item>
          </Col>
          <Col span={10} xs={24} sm={24} lg={10} style={{ padding: '0 10px' }}>
            <Form.Item label='State' name='state' rules={[{ required: true }]}>
              <Input placeholder='State' />
            </Form.Item>
          </Col>

          <Col span={10} xs={24} sm={24} lg={10} style={{ padding: '0 10px' }}>
            <Form.Item label='Company Name' name='companyName' rules={[{ required: true }]}>
              <Input placeholder='Company Name' />
            </Form.Item>
          </Col>
          <Col span={10} xs={24} sm={24} lg={10} style={{ padding: '0 10px' }}>
            <Form.Item label='E-mail' name='email' rules={[{ required: true }]}>
              <Input type='email' placeholder='asd@gmail.com' />
            </Form.Item>
          </Col>
          <Col span={10} xs={24} sm={24} lg={10} style={{ padding: '0 10px' }}>
            <Form.Item label='Marketing Strategy' name='strategy' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={10} xs={24} sm={24} lg={10} style={{ padding: '0 10px' }}>
            <Form.Item label='Revenue Model' name='revenueModel' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <div className="d-flex ms-3 mt-3">
          <Button className='primary-button' htmlType='submit'>SUBMIT</Button>
        </div>
      </Form>
      }
    </Layout>
  )
}

export default ApplicationPage