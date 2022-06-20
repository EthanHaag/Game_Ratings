import React, { useEffect, useState } from 'react'
import {NavLink} from 'react-router-dom'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import '../App.css'
const Header = ({loginUser,setLoginUser}) => {
    const [user, setUser] = useState(null)
    useEffect(()=>{
        const userToken = Cookies.get('userToken')
        if(userToken) {
            const user = jwtDecode(userToken)
            setUser(user)
        }
        console.log(loginUser)
    },[loginUser]);
    const handleLogout = ()=>{
        axios.post('http://localhost:8000/logout',{},{withCredentials:true})
            .then((res)=>{
                Cookies.remove('userToken')
                setUser(null)
                setLoginUser(false)
            })
            .catch((err)=>{
                console.log("error in Logout function", err)
            })
    }
    return (
        <header>
            <div className='Header'>
                <h1>Game Rating</h1>
                {user?
                    <div className='Header-component'>
                        <h3>Hello, {user.userName}</h3>
                        <button className='logoutBtn' onClick={handleLogout}>Logout</button>
                    </div>
                    :
                    <div className='Header-component'>
                        <NavLink to={'/UserLogin'}>Login</NavLink>
                        <NavLink to={'/CreateUser/'}>Register</NavLink>
                    </div>
                }   
            </div>
        </header>
    )
}
export default Header