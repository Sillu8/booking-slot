import { Tabs } from 'antd'
import TabPane from 'antd/lib/tabs/TabPane'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../Redux/alertSlice'
import Layout from '../User/Pages/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import {setUser } from '../Redux/userSlice'

function NotificationsPage() {
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const markAllasSeen = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get("/admin/markAllNotificationAsSeen",{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            });
            dispatch(hideLoading())
            if (response.data.success) {
              toast.success(response.data.message);
              dispatch(setUser(response.data.data))
            } else {
              toast.error(response.data.message);
            }
          } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            toast.error(error.response.data.message);
          }
    }


    const deleteAllNotifications = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get("/admin/deleteReadNotifications",{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            });
            dispatch(hideLoading())
            if (response.data.success) {
              toast.success(response.data.message);
              dispatch(setUser(response.data.data))
            } else {
              toast.error(response.data.message);
            }
          } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            toast.error(error.response.data.message);
          }
    }

    return (
        <Layout>
            <h1 className="page-title text-center">Notifications</h1>

            <Tabs className='ps-2'>
                <TabPane tab='Unread' key={0}>
                    <div className="d-flex justify-content-end pe-2">
                        <h1 className='anchor' style={{ cursor: 'pointer' }} onClick={markAllasSeen}>Mark all as read</h1>
                    </div>

                    {user?.unseenNotifications.map((notification, index) => {
                        return (
                            <div className='card p-2 mb-2' key={index} style={{cursor:'pointer'}} onClick={()=>navigate(notification.onClickPath)}>
                                <div className="card-text">{notification.message}</div>
                            </div>
                        )
                    })}
                </TabPane>



                <TabPane tab='Read' key={1}>
                    <div className="d-flex justify-content-end pe-2">
                        <h1 className='anchor' style={{ cursor: 'pointer' }} onClick={deleteAllNotifications}>Delete All</h1>
                    </div>


                    {user?.seenNotifications.map((notification, index) => {
                        return (
                            <div className='card p-2 mb-2' key={index} style={{cursor:'pointer'}} onClick={()=>navigate(notification.onClickPath)}>
                                <div className="card-text">{notification.message}</div>
                            </div>
                        )
                    })}
                </TabPane>


            </Tabs>
        </Layout>
    )
}

export default NotificationsPage