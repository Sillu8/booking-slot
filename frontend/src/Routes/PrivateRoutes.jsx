import React from 'react';  
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '../Redux/userSlice';
import { showLoading, hideLoading } from '../Redux/alertSlice';

function PrivateRoutes(props) {
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) {
            (async () => {
                try {
                    dispatch(showLoading())
                    const response = await axios.get('/home', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('jwt')}`
                        }
                    })
                    dispatch(hideLoading());
                    if (response.status) {
                        dispatch(setUser(response.data.data));
                    } else {
                        localStorage.removeItem('jwt');
                        navigate('/');
                    }
                } catch (error) {
                    dispatch(hideLoading());
                    localStorage.removeItem('jwt');
                    console.log(error);
                    navigate('/');
                }
            })();
        }
    }, [user])

    if (localStorage.getItem('jwt')) {
        return props.children
    } else {
        return <Navigate to="/" />
    }
}

export default PrivateRoutes;