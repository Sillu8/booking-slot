import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import Layout from '../User/Pages/Layout'
import { showLoading, hideLoading } from '../Redux/alertSlice'
import axios from 'axios'
import { Table } from 'antd';


function ApplicationsListPage() {
    const [apps, setApps] = useState([]);
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            try {
                dispatch(showLoading())
                const response = await axios.get("/admin/api/applications", {
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
    }, [])
    

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
            title: 'Actions',
            dataIndex: 'actions',
            render: (text,record) => (
                <div className='d-flex'>
                    <h1 className='anchor'>Approve</h1> 
                </div>
            )
        },
    ]

    const newApps = apps.map((app)=>{
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
            <h1>
                New Applications
            </h1>
            <Table columns={columns} dataSource={newApps}/>
        </Layout>
    )
}

export default ApplicationsListPage