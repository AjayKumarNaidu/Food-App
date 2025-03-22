import React, { useContext } from 'react'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Menu from '../components/Menu'
import { StoreContext } from '../context/StoreContext'
import About from './About'

const Home = () => {

  const {showLogin,setShowLogin} = useContext(StoreContext)

  return (
    <div>
      {showLogin && <Login />}
      <Navbar />
      <Header />
      <Menu />
      <About />
    </div>
  )
}

export default Home
