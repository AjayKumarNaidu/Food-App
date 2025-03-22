import React, { useEffect, useState } from 'react'
import './AllItems.css'
import axios from 'axios'

const AllItems = ({url}) => {


  const [dataArray,setDataArray] = useState([])

  const showAllItems = async ()=>{
    try {
      const {data} = await axios.get(url+'/food/all')
      if(data.success){
        setDataArray(data.data)
        console.log(data.data)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    showAllItems()
  }, [])

  const handleDelete = async(id)=>{
    try {
      const {data} = await axios.delete(url+`/food/del/${id}`)
      if(data.success){
        alert(data.message)
        setDataArray(prev => prev.filter(item => item._id !== id))
      }
    } catch (error) {
      alert(error.message)
    }
  }
  
  return (
    <div className='allitems'>
      {dataArray.map((item)=>(
        <div key={item._id} className='item'>
         <img src={item.image} alt='image'/>
         <h3>{item.name}</h3>
         <h3>{item.price}</h3>
         <h3>{item.desc}</h3>
         <h3 onClick={()=> handleDelete(item._id)} className='delete'>X</h3>
       </div>
      ))}
    </div>
  )
}

export default AllItems
