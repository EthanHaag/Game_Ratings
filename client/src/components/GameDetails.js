import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams, Link, NavLink} from "react-router-dom";
import '../App.css'
const GameDetails = () => {
    const [game, setGame] = useState({})
    const{name} = useParams()
    const [ratings, setRatings] = useState()
    useEffect(() => {
        axios.get("http://localhost:8000/api/games/" + name)
            .then( res => {
                setGame(res.data);
            })
            .catch( err => console.log(err) )
        axios.get('http://localhost:8000/api/rating/'+ name)
            .then(res =>{
                let newavrg = 0
                for (let rating of res.data){
                   newavrg += rating.rating
                }
                setRatings((newavrg / res.data.length).toFixed(1))
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div className='GamePage'>
            <h1>{game.name}</h1>
            <h1>Rating: {ratings}</h1>
            <h3>Type: {game.type}</h3>
            <h3>Developer: {game.developers}</h3>
            <h3>Publisher: {game.publishers}</h3>
            <p className='Game-Desc'>About: {game.short_description}</p>
            <img className='game-img' src={game.header_image} alt={game.name + "image"}/>
            <br/>
            <h3><NavLink to={'/game/'+game.name+'/reviews'}>Reviews for this game</NavLink></h3>
            <br/>
            <h4><NavLink to={'/Home'}>Home</NavLink></h4>
        </div>
    )
}
export default GameDetails