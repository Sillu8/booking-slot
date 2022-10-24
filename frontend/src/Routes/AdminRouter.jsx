import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import NotificationsPage from '../Admin/NotificationsPage'
import UserlistPage from '../Admin/UserlistPage'
import ApplicationsListPage from '../Admin/ApplicationsListPage'

function AdminRouter() {
  return (
    <>
      <Routes>
        <Route path='/notifications' element={
          <PrivateRoutes>
            <NotificationsPage />
          </PrivateRoutes>
        } />

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

      </Routes>
    </>
  )
}

export default AdminRouter