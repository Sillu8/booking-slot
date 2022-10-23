import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Layout from './Layout'


function UserHome() {

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('/home',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('jwt')}` 
                        }
                    })
            } catch (error) {
                console.log(error)
            }
        })();
    // eslint-disable-next-line
    }, [])
    return <Layout>
        <h1>Home page</h1>
    </Layout>
}

export default UserHome

