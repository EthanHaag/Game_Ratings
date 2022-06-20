import React, { useEffect, useState } from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios';
import '../App.css'
const Home = (props) => {
    const [games, setGames] = useState([])
    const [randgames, setRandgames] = useState()
    const [searchQuerry, setSearchQuerry] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoaded2, setIsLoaded2] = useState(false)
    useEffect(() => {
        axios.get("http://localhost:8000/api/games/")
            .then( res => {
                setGames(res.data);
                setIsLoaded(true)
            })
            .catch( err => console.log(err) )
    }, [])

    const getGameDetails = (e) => {
        e.preventDefault()
        axios.get("http://localhost:8000/api/games/"+games[Math.floor(Math.random()*games.length)].name)
            .then(res => {
                setRandgames(res.data)
                setIsLoaded2(true)
            })
            .catch( err => console.log(err) )
    }
    const searchHandler = (e) => {
        e.preventDefault()
        setIsLoaded2(false)
        setSearchResults([])
        games.find(game =>{
            if(game.name.toLowerCase().includes(searchQuerry.toLowerCase())){
                setSearchResults(searchResults => [...searchResults, game.name])
            }
        })
    }
    if(!isLoaded){
        return (
            <div className='Home-Container'>
                <h3>Loading</h3>
            </div>
        )
    }
    if(!isLoaded2){
        return (  <div className='Home-Container'>
        <div className="Home-Main">
            <h3>Search for your favorite video game to leave a review on!</h3>
            <form onSubmit={searchHandler}>
                <input className='searchBar' type={"text"} placeholder={"Search for video games"}  onChange={(e) => setSearchQuerry(e.target.value)}/>
                <button className="searchBtn" type='submit'>Search</button>
            </form>
            <button className='RandomBtn' onClick={getGameDetails}>Random game</button>
        </div>
        {
            searchResults?
            <div className='SearchResults'>
                {
                    searchResults.map((game, index)=>{
                        return (
                        <div key={index} className="Result-style">
                        <br/>
                        <NavLink className="Result-style" to={'/game/'+game} key={index}>{game}</NavLink>
                        </div>
                    )})
                }
            </div>: null
        }</div>
        )
    }
    return(
        <div className='Home-Container'>
            <div className="Home-Main Random-page">
                <h3>Search for your favorite video game to leave a review on!</h3>
                <form onSubmit={searchHandler}>
                    <input className='searchBar' type={"text"} placeholder={"Search for video games"} onChange={(e) => setSearchQuerry(e.target.value)}/>
                    <button className="searchBtn" type='submit'>Search</button>
                </form>
                <NavLink className="Result-style Random-Link" to={"/game/"+randgames.name}>{randgames.name}</NavLink>
                <br/>
                <img src={randgames.header_image} alt={randgames.name+ "image"} width="300"></img>
                <br/>
                <button className='RandomBtn' onClick={getGameDetails}>Random games</button>
            </div>
        </div>
    )
}
export default Home;