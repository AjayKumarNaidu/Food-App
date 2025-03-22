import React, { useState } from 'react'
import axios from 'axios'
import './AddItem.css'
import { useNavigate } from 'react-router-dom'

const AddItem = () => {

  const navigate = useNavigate()

  const [name,setName] = useState('')
  const [price,setPrice] = useState('')
  const [desc,setDesc] = useState('')
  const [image,setImage] = useState('')
  const [category,setCategory] = useState('')

  const url = 'http://localhost:4000'

  const handleSubmit = async(event)=>{
    event.preventDefault()
    try {
      const {data} = await axios.post(url+'/food/add',{name,price,desc,image,category})
      console.log(data.success)
      if(data.success){
        setName('')
        setImage('')
        setPrice('')
        setDesc('')
        setCategory('')
        navigate('/')
      }else{
        alert(data.message)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className='additem'>
      <h1>Enter the New Food Item</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input type='text' placeholder='Name' name='name' value={name} onChange={(e)=> setName(e.target.value)}/>
        <input type='text' placeholder='Price' name='price' value={price} onChange={(e)=> setPrice(e.target.value)}/>
        <input type='text' placeholder='Description' name='desc' value={desc} onChange={(e)=> setDesc(e.target.value)}/>
        <input type='text' placeholder='Image Url' name='image' value={image} onChange={(e)=> setImage(e.target.value)}/>
        <input type='text' placeholder='Category' name='category' value={category} onChange={(e)=> setCategory(e.target.value)}/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AddItem
