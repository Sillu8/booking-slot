import React from 'react'
import { Navigate } from 'react-router-dom'

function PublicRoute(props) {
    if (localStorage.getItem('jwt')) {
        return <Navigate to="/home" />
    } else {
        return props.children
    }

}

export default PublicRoute