import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { StoreContext } from '../context/StoreContext'
import './Cart.css'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const navigate = useNavigate()

  const {foodData,itemsCount} = useContext(StoreContext)

  const [total,setTotal] = useState(0)

  const deliveryFee = 2;

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

      <div className='cartItems'>
        <div className='cartHeading'>
          <h2>Image</h2>
          <h2>Name</h2>
          <h2>Count</h2>
          <h2>Price</h2>
          <h2>Edit</h2>
        </div>
        <div className='cartItems1'>
          {foodData.map((item,index)=>{

            return (
              itemsCount[item._id] > 0 && (
              <div className='cartItem' key={item.id}>
                <div className='cartItem-img'><img src={item.image} /></div>
                <p>{item.name}</p>
                <p>{itemsCount[item._id]}</p>
                <p>{item.price * itemsCount[item._id]}</p>
                <p>X</p>
              </div>
              )
            )
          })}
        </div>

        <div className='grandTotal'>
          <h2>Total Amount</h2>
          <div><h3>Cart Price</h3><h3>:</h3><h3>{total > 0 ? total : 0}/-</h3></div>
          <div><h3>Delivery Fee</h3><h3>:</h3><h3>{total > 0 ? deliveryFee : 0}/-</h3></div>
          <div><h3>Grand Total</h3><h3>:</h3><h3>{total > 0 ? total + deliveryFee : 0}/-</h3></div>
          <button onClick={()=>navigate('/order')}>Proceed to CheckOut</button>
        </div>
      </div>
      
    </div>
  )
}

export default Cart
