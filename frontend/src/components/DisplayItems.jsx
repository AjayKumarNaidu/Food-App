import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../context/StoreContext'
import './DisplayItems.css'
import axios from 'axios'

const DisplayItems = () => {

  const {foodData,currMenu,itemsCount,setItemsCount,token,url} = useContext(StoreContext)

  const handlePlus = async (id)=>{
    setItemsCount(prev => ({...prev,[id]: (prev[id] || 0) + 1}))
    await axios.post(url+'/cart/add',{foodId:id},{headers:{token}})
  }

  const handleMinus = async(id)=>{
    setItemsCount(prev => ({...prev,[id]: prev[id]  > 0 ? prev[id]-1 : 0}))
    await axios.post(url+'/cart/remove',{foodId:id},{headers:{token}})
  }

  useEffect(()=>{
    console.log(itemsCount)
  },[])

  return (
    <div className='display-items'>
      {foodData.map((item,index)=>(
        (item.category === currMenu || currMenu ==='all') && 
          (<div className='display-item' key={index}>
            {itemsCount[item._id] > 0 && 
              <div className='minus' onClick={()=>handleMinus(item._id)}>
                <i className="fa-solid fa-minus"></i>
              </div>
            }
            
            {itemsCount[item._id] > 0 ? <p className='count'>{itemsCount[item._id]}</p>: ''}
            <div className='plus' onClick={()=>handlePlus(item._id)}>
              <i className="fa-solid fa-plus"></i>
              </div>
            <img src={item.image}/>
            <h1>{item.name}</h1>
            <h4>{item.desc}</h4>
            <p>{item.price}$</p>
          </div>)
      ))}
    </div>
  )
}

export default DisplayItems
