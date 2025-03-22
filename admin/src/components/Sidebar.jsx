import React from 'react'
import './Sidebar.css'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()
  return (
    <div className='sidebar'>
      <div onClick={()=> navigate('add-item')}>Add Item</div>
      <div onClick={()=> navigate('all-items')}>All Items</div>
      <div onClick={()=> navigate('orders')}>Orders</div>
    </div>
  )
}

export default Sidebar
