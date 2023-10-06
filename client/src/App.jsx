import React from 'react'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import Registration from './Components/Registration'
import Foods from './Components/Foods'

import { BrowserRouter,Routes,Route } from "react-router-dom"
import "./App.css"
import CartContextComponent from './Global/CartContextComponent'
import Cart from './Components/Cart'
import SuccessMessage from './Components/SuccessMessage'
const App = () => {
  return (
    <>
    <CartContextComponent>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/register" element = {<Registration/>}/>
          <Route path = "/cart" element = {<Cart/>}/>
          <Route path = "/success" element = {<SuccessMessage/>}/>
          <Route path = "/foods" element = { window.localStorage.length > 0 ? <Foods/> : <Login/>}/>
        </Routes>
      </BrowserRouter>
    </CartContextComponent>  
    </>
  )
}

export default App
