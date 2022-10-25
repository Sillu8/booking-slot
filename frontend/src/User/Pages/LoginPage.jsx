import { Button, Form, Input } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';


function LoginPage() {
    

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
            dispatch(showLoading())
            const response = await axios.post("/", values);
            console.log(response)
            dispatch(hideLoading())
            if (response.data.status) {
                localStorage.setItem('jwt',response.data.token)
                toast.success(response.data.message);
                toast('Redirecting to home page')
                navigate("/")
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            toast.error("Something went wrong");
        }

    }
    return (
        <div className='authentication'>
            <div className='authentication-form card p-3'>
                <h1 className='card-title'>Welcome</h1>
                <Form layout='vertical' onFinish={onFinish}>

                    <Form.Item label='Email' name='email'>
                        <Input placeholder='Email' />
                    </Form.Item>
                    <Form.Item label='Passwod' name='password'>
                        <Input placeholder='Password' type='password' />
                    </Form.Item>
                    <Button className='primary-button my-2' htmlType='submit'>LOGIN</Button>
                    <Link to='/signup' className='anchor mt-2 text-center'>Create an account.</Link>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage