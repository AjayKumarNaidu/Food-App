import { createContext, useEffect, useState } from "react";
import axios from 'axios'
export const StoreContext = createContext()

export const StoreContextProvider = (props)=>{

  const url = 'http://localhost:4000'

  const [foodData1,setFoodData1] = useState([])

  const temp1 = foodData1.reduce((acc,curr)=>{
    if(!acc.some(t => t.category == curr.category)){
      acc.push({category:curr.category,img:curr.image})
    }
    return acc
  },[])

  const [currMenu,setCurrMenu] = useState('all')

  const [itemsCount,setItemsCount] = useState({})

  const [showLogin,setShowLogin] = useState(false)

  const [token,setToken]  = useState('')

  const fetchFoodData = async()=>{
    try {
      const {data} = await axios.get(url+'/food/all')
      if(data.success){
        setFoodData1(data.data)
        
      }else{
        alert(data.message)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  const loadCartData = async (token)=>{
    try {
      
      const {data} = await axios.post(url+'/cart/all',{},{headers:{token}})
      

      if(data.success){
        setItemsCount(data.cartData)
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    const storedToken = localStorage.getItem('token');
    if(storedToken){
      setToken(storedToken)
      loadCartData(storedToken)
    }
    fetchFoodData()

  },[])

  const value = {
    categories:temp1,
    foodData:foodData1,
    currMenu,setCurrMenu,
    itemsCount,setItemsCount,
    showLogin,setShowLogin,
    url,
    token,setToken,
  }

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  )
}