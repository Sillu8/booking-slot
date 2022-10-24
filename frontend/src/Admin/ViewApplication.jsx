import React from 'react'
import Layout from '../User/Pages/Layout'
import { Row, Col, Button } from 'antd'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../Redux/alertSlice'
import { useState } from 'react'
import toast from 'react-hot-toast'

function ViewApplication() {
    const location = useLocation();
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {

        (async () => {
            try {
                dispatch(showLoading())
                const response = await axios.get(location.pathname, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                });
                dispatch(hideLoading())
                setData(response.data.appData)
            } catch (error) {
                dispatch(hideLoading())
                console.log(error);
            }
        })();

        //eslint-disable-next-line
    }, [])


    const changeApplicationStatus = async (record) => {
        try {
            dispatch(showLoading())
            const response = await axios.post("/admin/approveApplication",
                {
                    _id: data._id, userId: data.userId, status: 'approved'
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                });

            if (response.data.success) {
                dispatch(hideLoading());
                toast.success('Successfully Approved');
                navigate('/admin/apps');
            } else {
                toast.error('Some unknown error occured.')
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            toast.error('Please try again later.')
        }
    }

    return (
        <Layout>
            <h1 className='page-title ms-4'>Application</h1>
            <Row gutter={10}>
                <Col span={12} sm={24} xs={24} md={12} lg={12}>
                    <div className='d-flex'>
                        <div className="label">Name :</div>  <div className='data'> {data.application?.name}</div>
                    </div>
                </Col>
                <Col  span={12} sm={24} xs={24} md={12} lg={12}>
                    <div className='d-flex'>
                        <div className="label">Address :</div>  <div className='data'> {data.application?.address}</div>
                    </div>
                </Col>
                <Col  span={12} sm={24} xs={24} md={12} lg={12}>
                    <div className='d-flex'>
                        <div className="label">City :</div>  <div className='data'> {data.application?.city}</div>
                    </div>
                </Col>
                <Col  span={12} sm={24} xs={24} md={12} lg={12}>
                    <div className='d-flex'>
                        <div className="label">State :</div>  <div className='data'> {data.application?.state}</div>
                    </div>
                </Col>
                <Col  span={12} sm={24} xs={24} md={12} lg={12}>
                    <div className='d-flex'>
                        <div className="label">Company Name :</div>  <div className='data'> {data.application?.companyName}</div>
                    </div>
                </Col>
                <Col  span={12} sm={24} xs={24} md={12} lg={12}>
                    <div className='d-flex'>
                        <div className="label">Email :</div>  <div className='data'> {data.application?.email}</div>
                    </div>
                </Col>
                <Col  span={12} sm={24} xs={24} md={12} lg={12}>
                    <div className='d-flex'>
                        <div className="label">Revenue Model :</div>  <div className='data'> {data.application?.revenueModel}</div>
                    </div>
                </Col>
                <Col  span={12} sm={24} xs={24} md={12} lg={12}>
                    <div className='d-flex'>
                        <div className="label">Strategy :</div>  <div className='data'> {data.application?.strategy}</div>
                    </div>
                </Col>
                <Col  span={12} sm={24} xs={24} md={12} lg={12}>
                    <div className='d-flex'>
                        <div className="label">Status :</div>  <div className='data'> {data.status}</div>
                    </div>
                </Col>
            </Row>
            

            <div className="d-flex ms-3 mt-3">
                <Button className='primary-button' onClick={changeApplicationStatus}>Approve</Button>
            </div>
        </Layout>
    )
}

export default ViewApplication