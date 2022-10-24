import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import Layout from '../User/Pages/Layout'
import { showLoading, hideLoading } from '../Redux/alertSlice'
import axios from 'axios'
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

function ApprovedApplicationPage() {

    const navigate = useNavigate()
    const [apps, setApps] = useState([]);
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            try {
                dispatch(showLoading())
                const response = await axios.get("/admin/api/approved-applications", {
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



    const rejectApplication = async (record) => {
        try {
            dispatch(showLoading())
            const response = await axios.post("/admin/reject-app",
                {
                    _id: record._id, userId: record.userId, status: 'rejected'
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                });

            if (response.data.success) {
                dispatch(hideLoading());
                setApps(response.data.data);
                toast.success('The application has been rejected.');
                navigate('/admin/rejected-apps');
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
                    <i class="ri-close-circle-fill" style={{ cursor: 'pointer', fontSize: '25px' }}  onClick={() => rejectApplication(record)}></i>
                </div>
            )
        },
        {
            title: 'Slot',
            dataIndex: 'slot',
            render: (text, record) => (
                <div className='d-flex'>
                    {record.slot ? <p>{record.slot}</p>
                    
                    : 
                    
                    <i className="ri-coupon-3-fill" style={{cursor: "pointer"}}
                     onClick={()=> navigate('/admin/slot',{state: {_id: record._id, company: record.companyName}})}></i>}
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
            ...app.application,
            slot: app.slot
        }
    })

    return (
        <Layout>
            <h1 className='text-center'>
                Approved Applications
            </h1>
            <Table columns={columns} dataSource={newApps} />
        </Layout>
    )
}

export default ApprovedApplicationPage