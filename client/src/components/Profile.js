import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
function Profile() {
    const username = useParams();
  return (
    <div>
        <h1>{username.userName}'s Profile</h1>
    </div>
  )
}

export default Profile