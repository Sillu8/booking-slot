import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Layout from './Layout'



function UserHome() {
    const [user, setUser] = useState({})
    // const location = useLocation()
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('/home',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('jwt')}`
                        }
                    })
                setUser(response.data.data)
            } catch (error) {
                console.log(error)
            }
        })();
        // eslint-disable-next-line
    }, [])


    return <Layout>
        <h1 className='text-center pt-3' >Welcome {user?.name}</h1>

        {
            user?.isAdmin ? 
            <p></p>           
            :
                user?.appId?.slot ?
                    <h3 className='text-center pt-4'>Your slot is booked at {user?.appId?.slot}</h3>
                    :
                    <h3 className='text-center pt-4'>Your application is currently {user?.appId?.status}.</h3>
        }


    </Layout>
}

export default UserHome

