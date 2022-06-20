import React, {useState} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import Home from './components/Home';
import CreateUser from './components/CreateUser';
import GameDetails from './components/GameDetails';
import UserLogin from './components/UserLogin';
import Reviews from './components/Reviews';
import NewReview from './components/NewReview';
import UpdateReview from './components/UpdateReview';
import NotFound from './components/NotFound';
function App() {
  const [loginUser, setLoginUser] = useState(false)
  return (
    <div className="App">
      <BrowserRouter>
        <Header loginUser={loginUser} setLoginUser={setLoginUser}/>
        <Routes>
          <Route element={<Reviews loginUser={loginUser}/>} path="/game/:name/reviews"/>
          <Route element={<Home/>} path="/home/" />
          <Route element={<CreateUser setLoginUser={setLoginUser}/>} path="/CreateUser/"/>
          <Route element={<UserLogin setLoginUser={setLoginUser}/>} path="/UserLogin/"/>
          <Route element={<GameDetails/>} path="/game/:name"/>
          <Route path="/game/:name/updateReview/:id" element={<UpdateReview/>}/>
          <Route path="/game/:name/newReview" element = {<NewReview/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;