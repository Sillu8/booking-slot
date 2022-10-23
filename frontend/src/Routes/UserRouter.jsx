import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ApplicationPage from '../User/Pages/ApplicationPage'
import LoginPage from '../User/Pages/LoginPage'
import SignupPage from '../User/Pages/SignupPage'
import UserHome from '../User/Pages/UserHome'
import PrivateRoutes from './PrivateRoutes'
import PublicRoute from './PublicRoutes'

function UserRouter() {
    return (
        <>
            <Routes>
                <Route path='/' element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                } />
                <Route path='/signup' element={
                    <PublicRoute>
                        <SignupPage />
                    </PublicRoute>
                } />
                <Route path='/home' element={
                    <PrivateRoutes>
                        <UserHome />
                    </PrivateRoutes>
                } />
                <Route path='/booking' element={
                    <PrivateRoutes>
                        <ApplicationPage />
                    </PrivateRoutes>
                } />
            </Routes>
        </>

    )
}

export default UserRouter