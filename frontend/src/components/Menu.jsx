import React, { useContext, useState } from 'react'
import './Menu.css'
import { StoreContext } from '../context/StoreContext'
import DisplayItems from './DisplayItems'

const Menu = () => {

  const {categories,currMenu,setCurrMenu} = useContext(StoreContext)
  
  return (
    <>
      <div className='items' id='menu'>
        {categories.map((item,index)=>(
          <div className='item' key={index}>
            <img src={item.img} 
              onClick={()=>setCurrMenu(prev => prev===item.category?'all':item.category)}
              className={currMenu===item.category? 'active-menu' : ''} 
            />
            <p>{item.category}</p>
          </div>
        ))}
      </div>
      <DisplayItems />
    </>
    
  )
}

export default Menu
