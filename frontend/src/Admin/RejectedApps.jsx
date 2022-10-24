import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../Redux/alertSlice';
import Layout from '../User/Pages/Layout'

function RejectedApps() {
    const [apps, setApps] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            try {
                dispatch(showLoading())
                const response = await axios.get("/admin/rejected-apps", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                });
                if (response.data.success) {
                    dispatch(hideLoading())
                    setApps(response.data.appsData)
                }
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
                    _id: record._id, userId: record.userId, status: 'approved'
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                });

            if (response.data.success) {
                dispatch(hideLoading());
                setApps(response.data.data);
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



    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Company',
            dataIndex: 'companyName'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Action',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex'>
                    <i class="ri-eye-fill"  style={{ cursor: 'pointer', fontSize: '27px', paddingRight: '10px' }} onClick={() => navigate(`/admin/application/${record._id}`)}></i>
                    <i class="ri-checkbox-circle-fill" style={{ cursor: 'pointer', fontSize: '25px', paddingRight: '10px' }}  onClick={() => changeApplicationStatus(record)}></i>
                </div>
            )
        },
    ]

    const newApps = apps.map((app) => {
        return {
            app: app.createdAt,
            status: app.status,
            updatedAt: app.updatedAt,
            userId: app.userId,
            _id: app._id,
            ...app.application
        }
    })

    return (
        <Layout>
            <h1 className='text-center'>
                Rejected Applications
            </h1>
            <Table columns={columns} dataSource={newApps} />
        </Layout>
    )
}

export default RejectedApps;