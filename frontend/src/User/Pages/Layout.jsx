import { Badge } from 'antd'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './layout.css'

function Layout({ children }) {
    const [collapse, setCollapse] = useState(true)
    const { user } = useSelector(state => state.user)
    const location = useLocation()
    const navigate = useNavigate()
    const userMenu = [
        {
            name: "Home",
            path: "/home",
        },
        {
            name: "Add Application",
            path: "/booking",
        },
        {
            name: "Profile",
            path: "/profile",
        },
    ];
    const adminMenu = [
        {
            name: 'New Application',
            path: '/admin/newApps'
        },
        {
            name: 'Pending Applications',
            path: '/admin/Apps'
        },
        {
            name: 'Users',
            path: '/admin/users'
        },
    ]


    const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu
    return (
        <div className='main'>
            <div className='d-flex layout'>
                {!collapse &&
                    <div className='sidebar'>
                        <div className='sidebar-header'>
                            <h1 className='logo'>Incubation</h1>

                        </div>
                        <div className='menu'>
                            {menuToBeRendered.map((menu, index) => {
                                const isActive = location.pathname === menu.path;
                                return <div key={index} className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                                    <Link to={menu.path}>{menu.name}</Link>
                                </div>
                            })}
                            <div className={`d-flex menu-item`} style={{ color: "rgba(255, 255, 255, 0.737)", cursor: 'pointer' }} onClick={() => {
                                localStorage.clear();
                                navigate('/')
                            }}>
                                Logout
                            </div>
                        </div>


                    </div>}

                <div className='content'>
                    <div className='header'>
                        {!collapse ? <i onClick={() => setCollapse(!collapse)}
                            className='ri-close-fill header-action-icon'></i> :
                            <i onClick={() => setCollapse(!collapse)}
                                className='ri-menu-2-fill header-action-icon'></i>}

                        <div className="d-flex align-items-center px-4" onClick={()=> navigate('/admin/notifications')}>
                            <Badge count={user?.unseenNotifications.length}>
                                <i className='ri-notification-line header-action-icon px-3'></i>
                            </Badge>
                            <Link className='mx-3' to={'/profile'}>{user?.name}</Link>
                        </div>
                    </div>
                    <div className='body'>
                        {children}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Layout