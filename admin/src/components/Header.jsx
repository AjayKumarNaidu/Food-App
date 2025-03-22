import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className='header'>
      <h1 onClick={()=>navigate('/')}>Admin</h1>
      <span>.</span>
    </div>
  )
}

export default Header
