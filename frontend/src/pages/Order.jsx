import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { StoreContext } from '../context/StoreContext'
import './Order.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Order = () => {

   const {foodData,itemsCount,url,token} = useContext(StoreContext)
  
    const [total,setTotal] = useState(0)
  
    const deliveryFee = 2;

    const navigate = useNavigate();

    const [data,setData] = useState({
      firstName:"",
      lastName:"",
      email:"",
      street:"",
      city:"",
      state:"",
      pincode:"",
      country:"",
      phoneNumber:""
    })

    const onChangeHandler = (event)=>{
      const name = event.target.name;
      const value = event.target.value;
      setData(prev => ({...prev,[name]:value}))
      console.log(data)
    }

    const placeOrder = async (event)=>{
      event.preventDefault()

      try {
        if(total > 0){
          let itemsInfo = []
          foodData.map((item)=>{
            if(itemsCount[item._id] > 0){
              let temp = item
              temp['quantity'] = itemsCount[item._id]
              itemsInfo.push(temp)
            }
          })
          let itemsData = {
            items:itemsInfo,
            address:data,
            amount:total
          }
          let response = await axios.post(url+'/order/place',itemsData,{headers:{token}})
          if(response.data.success){
            console.log('placed order')
            navigate('/orders')
          }else{
            console.log('error in placing order',response.data.message)
          }
        }else{
          alert('your cart is empty')
          navigate('/cart')
        }
      } catch (error) {
        console.log(error)
      }
    }
  
    useEffect(()=>{
      const newTotal = foodData.reduce((acc,item)=>{
        if(itemsCount[item._id] > 0){
          return acc + (item.price * itemsCount[item._id])
        }else{
          return acc
        }
      },0)

      setTotal(newTotal);
      
    },[])


  return (
    <div>
      <Navbar />
      <form className='order-page' onSubmit={placeOrder}>
        <h1>User Details</h1>
        <div className='order-left'>
          <div className='multi-inputs'>
            <input name='firstName' value={data.firstName} onChange={(e) => onChangeHandler(e)} type='text' placeholder='first-name' />
            <input name='lastName' value={data.lastName} onChange={(e) => onChangeHandler(e)} type='text' placeholder='last-name' />
          </div>
          <input name='email' value={data.email} onChange={(e) => onChangeHandler(e)} type='email' placeholder='email' />
          <input name='street' value={data.street} onChange={(e) => onChangeHandler(e)} type='text' placeholder='street' />
          <div className='multi-inputs'>
            <input name='city' value={data.city} onChange={(e) => onChangeHandler(e)} type='text' placeholder='city' />
            <input name='state' value={data.state} onChange={(e) => onChangeHandler(e)} type='text' placeholder='state' />
          </div>
          <div className='multi-inputs'>
            <input name='pincode' value={data.pincode} onChange={(e) => onChangeHandler(e)} type='text' placeholder='pincode' />
            <input name='country' value={data.country} onChange={(e) => onChangeHandler(e)} type='text' placeholder='country' />
          </div>
          <input name='phoneNumber' value={data.phoneNumber} onChange={(e) => onChangeHandler(e)} type='text' placeholder='phone-number' />
        </div>

        <div className='grandTotal'>
          <h2>Total Amount</h2>
          <div><h3>Cart Price</h3><h3>:</h3><h3>{total > 0 ? total : 0}/-</h3></div>
          <div><h3>Delivery Fee</h3><h3>:</h3><h3>{total > 0 ? deliveryFee : 0}/-</h3></div>
          <div><h3>Grand Total</h3><h3>:</h3><h3>{total > 0 ? total + deliveryFee : 0}/-</h3></div>
        </div>

        <button type='submit'>Confirm Order</button>
      </form>
    </div>
  )
}

export default Order
