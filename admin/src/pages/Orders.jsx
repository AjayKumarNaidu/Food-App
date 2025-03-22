import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import './Orders.css'

const Orders = ({url}) => {

  const [orders,setOrders] = useState([])

  const fetchAllOrders = async ()=>{
    try {
      const {data} = await axios.get(url+'/order/all')
      if(data.success){
        setOrders(data.data)
        console.log(data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelect = async (event,id)=>{
    try {
      const {data} = await axios.post(url+'/order/update',{userId:id,option:event.target.value})
      if(data.success){
        console.log('Status updated')
      }else{
        console.log(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  },[])

  return (
    <div className='orders-page'>
      <h1 style={{marginLeft:'250px'}}>Welcome To Orders Page</h1>
      <div className="orders-list">
        {orders.map((order,index)=>{
          return (
            <div className='order' key={index}>
              <i className="fa-solid fa-box-archive"></i>
              <p className='items'>
                {order.items.map((item,index)=>(
                  <p key={index}>{item.name+' x '+item.quantity}</p>
                ))}
              </p>
              <p>Amount:{order.amount}</p>
              <p>{order.address.firstName+" "+order.address.lastName}</p>
              <select onClick={(e)=>handleSelect(e,order._id)}>
                <option value='Food Processing'>Food Processing</option>
                <option value='On Delivery'>On Delivery</option>
                <option value='Delivered'>Delivered</option>
              </select>
            </div>
        )})}
      </div>
    </div>
  )
}

export default Orders
