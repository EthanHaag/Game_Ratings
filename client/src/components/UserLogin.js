import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const UserLogin = ({setLoginUser}) => {
    const [user, setUser] = useState({
        userName:'',
        password:''
    });
    const [errors, setErrors] = useState()
    const navigate = useNavigate()
    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }
    const LoginHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/login',user,{withCredentials: true})
            .then(res => {
                setLoginUser(true)
                setErrors("")
                navigate("/home")
            })
            .catch(err=>{
                setErrors(err.response.data.message)
                console.log('error in UserLogin' , err)
            })
    }
    return (
        <div className="login-page">
            <form className='login-form' onSubmit={LoginHandler}>

                <label htmlFor='userName'>Username:</label>
                <input type="text" name='userName' value={user.userName} onChange={handleChange}/>


                <label htmlFor='password'>password:</label>
                <input type="password" name='password' value={user.password} onChange={handleChange}/>
                {errors? <p className='errors'>Invalid login</p>:null}

                <button className="loginBtn">Login</button>
            </form>
            <div className="login-div"><NavLink className="Link-login" to={"/home"}>Home</NavLink></div>
        </div>
      );
}
export default UserLogin