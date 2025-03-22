import React from 'react'
import { Routes , Route} from 'react-router-dom'
import Home from './pages/Home'
import AddItem from './pages/AddItem'
import AllItems from './pages/AllItems'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Orders from './pages/Orders'
import './App.css'

const App = () => {

  const url = 'http://localhost:4000'

  return (
    <div className='root'>
      <Header/>
      <div className='content'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home url={url}/>}/>
          <Route path='/add-item' element={<AddItem url={url}/>} />
          <Route path='/all-items' element={<AllItems url={url}/>} />
          <Route path='/orders' element={<Orders url={url}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
