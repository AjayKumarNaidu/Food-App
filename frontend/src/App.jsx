import React, { useContext } from 'react'
import {Routes,Route} from 'react-router-dom'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Order from './pages/Order'
import Orders from './pages/Orders'

const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<Order />}/>
        <Route path='/orders' element={<Orders />}/>
      </Routes>
    </div>
  )
}

export default App


//https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/2469fa88ee9b0b5d1366ba88f2a7fa7f