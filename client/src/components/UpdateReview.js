import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams, NavLink, useNavigate} from "react-router-dom";

const UpdateReview = () => {
    const {name, id} = useParams()
    const [newReview, setNewReview] = useState({
        rating:'',
        review:'',
        gameName:name
    })
    const [errors, setErrors] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        axios.get("http://localhost:8000/api/rating/id/" + id)
        .then( res => {
            setNewReview(res.data);
        })
        .catch( err => console.log(err) )
    }, [])
    const handleChange = (e) => {
        setNewReview({...newReview, [e.target.name]: e.target.value})
    }
    const reviewHandler = (e) =>{
        e.preventDefault()
        axios.put('http://localhost:8000/api/rating/'+id,newReview,{withCredentials:true})
            .then(res =>{
                setErrors('')
                navigate('/game/'+name+'/reviews')
            })
            .catch(err =>{
                setErrors(err.response.data.error.errors.review.message)
                console.log('error in review Update' , err)
            })
    }
  return (
    <div className='login-page'>
        <form className='login-form' onSubmit={reviewHandler}>

            <label htmlFor='rating'>Rating:</label>
            <select name='rating' value={newReview.rating} onChange={handleChange}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
            </select>

            <label htmlFor='review'>Description of Your Review:</label>
            <textarea name='review' value={newReview.review} onChange={handleChange}/>
            {errors? <p className='errors'>{errors}</p>:null}

            <button>Submit</button>
        </form>
    <br/>
    <div className='login-div'>
        <NavLink className={'Link-review'} to={"/home"}>Home</NavLink>
        <NavLink className={'Link-review'} to={"/game/"+name+"/reviews"}>Back</NavLink>
    </div>
</div>
  )
}
export default UpdateReview
