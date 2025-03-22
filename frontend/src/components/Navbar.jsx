import React, { useContext, useState } from 'react'
import './Navbar.css'
import { StoreContext } from '../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const [currMenu,setCurrMenu] = useState('home')
  const {setShowLogin,token,setToken} = useContext(StoreContext)

  const logout = ()=>{
    localStorage.removeItem('token')
    location.reload();
    setToken('')
  }

  const navigate = useNavigate()

  return (
    <div className='navbar'>
      <h1 className='navbar-title' onClick={()=>navigate('/')}>TastyTrack</h1>
      <ul>
        <a href='#top' className={currMenu === 'home'?'active':''} onClick={()=>setCurrMenu('home')}>Home</a>
        <a href='#menu' className={currMenu === 'menu'?'active':''} onClick={()=>setCurrMenu('menu')}>Menu</a>
        <a href='#about' className={currMenu === 'About'?'active':''} onClick={()=>setCurrMenu('About')}>About</a>
      </ul>
      <div className='navbar-right'>
        <i class="fa-solid fa-cart-shopping" onClick={()=>navigate('/cart')}></i>
        {token ? (
          <div className='profile'>
            <h1>A</h1>
            <div className='profile-items'>
              <h3 onClick={()=>navigate('/orders')}>Orders</h3>
              <h3 onClick={()=>logout()}>Logout</h3>
            </div>
          </div>
        ):(
          <button onClick={()=>{
            navigate('/')
            setShowLogin(true)}}>
              Sign In
            </button>
        )}
        
      </div>
    </div>
  )
}

export default Navbar
