import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import Layout from '../User/Pages/Layout'
import { showLoading, hideLoading } from '../Redux/alertSlice'
import axios from 'axios'
import { Table } from 'antd';


function UserlistPage() {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            try {
                dispatch(showLoading())
                const response = await axios.get("/admin/api/users", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                });
                setUsers(response.data.userData)
                if (response.data.success) {
                    dispatch(hideLoading())
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
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Phone',
            dataIndex: 'phone'
        },
    ]


    return (
        <Layout>
            <h1>
                Userslist
            </h1>
            <Table columns={columns} dataSource={users}/>
        </Layout>
    )
}

export default UserlistPage