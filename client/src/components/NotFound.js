import React from 'react'
import { NavLink } from 'react-router-dom'
const NotFound = () => {
  return (
    <div className='notFound'>
      <h1 className='notFoundContent'>This Page Does not Exist</h1>
      <h1 className='notFoundContent'><NavLink className="Links" to={'/home'}>HOME</NavLink></h1>
    </div>
    
  )
}
export default NotFound