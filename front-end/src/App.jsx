import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Navbar from './components/navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';


const App = () => {
  return (
  
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vm]'>
    <ToastContainer />
    <Navbar />
   

  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/collection' element={<Collection/>} />
    <Route path='/about' element={<About/>} />
    <Route path='/contact' element={<Contact/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/orders' element={<Orders/>} />
    <Route path='/place-order' element={<PlaceOrder/>} />
    <Route path='/product/:productId' element={<Product/>} />
    <Route path='/cart' element={<Cart/>} />
   

  </Routes> 
  <Footer/>
  </div>
    
  )
}

export default App
