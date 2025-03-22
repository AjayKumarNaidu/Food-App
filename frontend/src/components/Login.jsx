import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'

const Login = () => {

  const [currState,SetCurrState] = useState('Sign In')

  const {setShowLogin,showLogin,url,setToken} = useContext(StoreContext)

  const [data1,setData1] = useState({})

  const handleInput = (e)=>{
    const name = e.target.name
    const value = e.target.value
    setData1(prev=>({...prev,[name]:value}))
  }

  const handleSubmit = async (event)=>{
    event.preventDefault()
    let newUrl = url
    try {
      if(currState === 'Sign In'){
        newUrl += '/user/register'
      }else{
        newUrl += '/user/login'
      }

      const {data} = await axios.post(newUrl,data1)

      if(data.success){
        localStorage.setItem('token',data.token)
        setToken(data.token)
        setShowLogin(false)
      }else{
        console.log(data.message)
        alert(data.message)
      }

    } catch (error) {
      console.log(error.message)
      alert(error.message)
    }
  }

  useEffect(()=>{
    console.log(data1)
  },[data1])

  return (
    <div className='login-page'>
      <div className='login-window'>
        <div className='login-header'>
          <h2>{currState}</h2>
          <i onClick={()=>setShowLogin(false)} class="fa-solid fa-xmark"></i>
        </div>
        <form className='login-form' onSubmit={handleSubmit}>
          {currState === 'Sign In' && (
            <input type='text' placeholder='Enter Name' name='name' value={data1.name} onChange={(e)=>handleInput(e)} required/>
          )}
          <input type='text' placeholder='Enter email' name='email' value={data1.email} onChange={(e)=>handleInput(e)} required/>
          <input type='password' placeholder='Enter password' name='password' value={data1.password} onChange={(e)=>handleInput(e)} required/>
          <button type='submit'>{currState}</button>
        </form>

        {currState==='Sign In'?(
          <p className='login-info'>Already have a account</p>
        ):(
          <p className='login-info'>Don't have a account</p>
        )}
        {currState === 'Sign In'?(
          <p className='small-access' onClick={()=>SetCurrState('Login')}>Login In</p>
        ):(
          <p className='small-access' onClick={()=>SetCurrState('Sign In')}>Sign In</p>
        )}

      </div>
    </div>
  )
}

export default Login
