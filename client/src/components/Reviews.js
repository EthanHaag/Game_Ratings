import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams, NavLink, useNavigate} from "react-router-dom";
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import '../App.css'
const Reviews = () => {
    const [reviews, setReviews] = useState([])
    const {name} = useParams()
    const [user, setUser] = useState(null)
    const [userReview, setUserReview] = useState()
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const userToken = Cookies.get('userToken')
        if(userToken) {
            const userT = jwtDecode(userToken)
            setUser(userT)
        }
        axios.get("http://localhost:8000/api/rating/" + name)
            .then( res => {
                setReviews(res.data)
                setLoaded(true)
            })
            .catch( err => console.log(err) )
    }, [])
    useEffect(() => {
        if(user){
            reviews.find(review =>{
                if(review.createdBy.userName === user.userName){
                    setUserReview(review)
                }
            })
        }
    }, [loaded])
    const deleteReview = (id) =>{
        console.log(id)
        axios.delete('http://localhost:8000/api/rating/' + id)
            .then(res => {
                setUserReview();
                setReviews(reviews.filter(review => review._id !== id)) 
            })
            .catch(err => console.log(err))
    }
    return (
    <div className='Reviews-Page'>
        
        <div className='reviewsTop'>
            <h2 className='reviewsMainTitle'>User Reviews For {name}</h2>
        {
            user?
            <NavLink className='Links' to={'/game/'+name+'/newReview'}>Leave a Review of this game!</NavLink>
            :
            <NavLink className='Links' to={'/UserLogin/'}>Login to leave a review</NavLink>
        }
            <NavLink className='Links' to={'/Home'}>Home</NavLink>
            <NavLink className='Links' to={"/game/"+name}>Back</NavLink>
        </div>
        {
            userReview?
            <div className='loginuser-review'>
            <h3>Your Review:</h3>
            <h1>Rating: {userReview.rating}</h1>
            <p>Review: {userReview.review}</p>
            <p>Posted by: {userReview.createdBy.userName}</p>
            <button className='loginuserBtn' onClick={() => navigate('/game/'+name+'/updateReview/'+userReview._id)}>Update Review</button>
            <button className='loginuserBtn' onClick={(e) =>{deleteReview(userReview._id)}}>Delete Review</button>
            </div>
            :
            null
        }
        <h2 className='midpageTitle'>All rieviews:</h2>
        {
            reviews.map((review, index)=>{
                return (
                    <div key={index} className="reviews">
                        <h3>Rating: {review.rating}</h3>
                        <p>Review: {review.review}</p>
                        <p>Posted by: {review.createdBy.userName}</p>
                    </div>
                )
            })
        }

    </div>
  )
}
export default Reviews
