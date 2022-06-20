import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
const CreateUser = ({setLoginUser}) => {
    const [user, setUser] = useState({
        firstName:'',
        lastName:'',
        userName:'',
        email:'',
        password:'',
        confirmPassword:''
    });
    const [errors, setErrors]= useState([])
    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }
    const createUser = (e) => {
        e.preventDefault()
        console.log("BUTTON PRESSED")
        axios.post('http://localhost:8000/register', user, {withCredentials: true})
            .then(res=>{
                setLoginUser(true) 
                setErrors("")
                navigate("/Home")
            })
            .catch(err=>{
                setErrors(err.response.data)
                console.log('error in createUser' , err)
            })
    }
    return (
       <div className='login-page'>
        <form className='login-form' onSubmit={createUser}>
            <label htmlFor='firstName'>First Name:</label>
            <input type="text" name='firstName' value={user.firstName} onChange={handleChange}/>

            <label htmlFor='lastName'>Last Name:</label>
            <input type="text" name='lastName' value={user.lastName} onChange={handleChange}/>

            <label htmlFor='userName'>Username:</label>
            <input type="text" name='userName' value={user.userName} onChange={handleChange}/>

            <label htmlFor='email'>Email Address:</label>
            <input type="text" name='email' value={user.email} onChange={handleChange}/>

            <label htmlFor='password'>password:</label>
            <input type="password" name='password' value={user.password} onChange={handleChange}/>

            <label htmlFor='confirmPassword'>Confrim Password:</label>
            <input type="password" name='confirmPassword' value={user.confirmPassword} onChange={handleChange}/>

            <button className='loginBtn'>Create Account</button>
        </form>
        <div className="login-div"><NavLink className="Link-login" to={"/home"}>Home</NavLink></div>
       </div>
    )
}
export default CreateUser;