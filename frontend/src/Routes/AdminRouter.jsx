import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import UserlistPage from '../Admin/UserlistPage'
import ApplicationsListPage from '../Admin/ApplicationsListPage'
import ApprovedApplicationPage from '../Admin/ApprovedApplicationPage'
// import EditUserData from '../Admin/EditUserData'
import ViewApplication from '../Admin/ViewApplication'
import RejectedApps from '../Admin/RejectedApps'
import SlotPage from '../Admin/SlotPage'

function AdminRouter() {
  return (
    <>
      <Routes>

        <Route path='/users' element={
          <PrivateRoutes>
            <UserlistPage />
          </PrivateRoutes>
        } />

        <Route path='/newApps' element={
          <PrivateRoutes>
            <ApplicationsListPage />
          </PrivateRoutes>
        } />

        <Route path='/apps' element={
          <PrivateRoutes>
            <ApprovedApplicationPage />
          </PrivateRoutes>
        } />
        {/* 
        <Route path='/user' element={
          <PrivateRoutes>
            <EditUserData />
          </PrivateRoutes>
        } /> */}

        <Route path='/application/:appId' element={
          <PrivateRoutes>
            <ViewApplication />
          </PrivateRoutes>
        } />

        <Route path='/rejected-apps' element={
          <PrivateRoutes>
            <RejectedApps />
          </PrivateRoutes>
        } />

        <Route path='/slot' element={
          <PrivateRoutes>
            <SlotPage />
          </PrivateRoutes>
        } />


      </Routes>
    </>
  )
}

export default AdminRouter