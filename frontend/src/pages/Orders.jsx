import React, { useContext, useEffect, useState } from 'react'
import './Orders.css'
import Navbar from '../components/Navbar'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'

const Orders = () => {

  const {url,token} = useContext(StoreContext)

  const [orders,setOrders] = useState([])

  const fetchOrders = async ()=>{
    const {data} = await axios.post(url+'/order/orders',{},{headers:{token}})
    if(data.success){
      console.log(data.data)
      setOrders(data.data)
    }else{
      console.log(data.message)
    }
  }

  useEffect(()=>{
    fetchOrders()
  },[token])

  return (
    <div>
      <Navbar />
      <div className='orders'>
        <h2>My Orders</h2>
        {orders.map((order,index)=>{
          return ( 
            <div className='order' key={index}>

              <i class="fa-solid fa-box-archive"></i>

              <p>{order.items.map((item,index)=>{
                return (item.name+"x"+item.quantity+"...")
              })}</p>

              <p>Amount:{order.amount}</p>

              <p className='status'>{order.status}</p>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Orders
