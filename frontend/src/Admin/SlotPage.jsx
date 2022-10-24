import { Button } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../Redux/alertSlice';
import Layout from '../User/Pages/Layout';
import './SlotPage.css'

function SlotPage() {

    const navigate = useNavigate()
    const location = useLocation();
    console.log(location.state);
    const [slots, setSlots] = useState([]);
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            try {
                dispatch(showLoading())
                const response = await axios.get("/admin/api/slots", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                });
                if (response.data.success) {
                    dispatch(hideLoading())
                    setSlots(response.data.slots)
                }
            } catch (error) {
                dispatch(hideLoading())
                console.log(error);
            }
        })();
        //eslint-disable-next-line
    }, [])


    const bookSlot = async (slot) => {
        const response = await axios.post("/admin/bookslot",
            {
                slot, id: location.state._id
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            });
        if (response.data.success) {
            toast.success(response.data.message);
            navigate('/admin/slot', { replace: true });
        }
    }

    return (
        <Layout>
            <div className="p-3">
                <h1 className='text-center'>Slots</h1>

                <div className="slots-list">
                    {slots.map((item) => {
                        return (

                            item.appId ?

                                <Button
                                    style={{ backgroundColor: 'rgb(128,128,128)', color: 'white', fontWeight: 'bold', cursor: 'not-allowed' }}
                                >{item.slot}</Button>
                                :
                                location.state === null ?
                                    <div>

                                        <Button
                                            style={{ backgroundColor: 'rgba(53, 172, 237, 0.8)', color: 'white', fontWeight: 'bold', cursor: 'not-allowed' }}
                                        >{item.slot}</Button>

                                    </div>

                                    :
                                    <Button
                                        style={{ backgroundColor: 'rgba(53, 172, 237, 0.8)', color: 'white', fontWeight: 'bold' }}
                                        onClick={() => { bookSlot(item.slot); }}
                                    >{item.slot}</Button>
                        )
                    })}
                </div>
            </div>


        </Layout>
    )
}

export default SlotPage