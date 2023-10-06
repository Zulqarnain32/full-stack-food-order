import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa"

import axios from 'axios'
import { cartContext } from '../Global/CartContextComponent'

const Navbar = () => {
  const {quantity} = useContext(cartContext)

  const handleLogout = () => {
    console.log('Logout route reached');
     window.localStorage.clear()
     axios.get('http://localhost:5000/logout')
     .then((result) => {
       console.log(result);
       window.location.reload();
     }).catch(err => console.log(err))
  }
  return (
    <>
        <nav>
            <div className="logo-side">
                <div className='logo'>
                  <Link to = "/">
                    <img src="/assets/logo1.png" className='logo-img'/>
                  </Link>
                   <span className='company-name '>Pizza<span className='company'>Wave</span></span>      

                </div>
            </div>
            <div className="links-side">
                <Link className = "nav-links" to = "/">HOME</Link>
                <Link className = "nav-links" to = "/foods">FOODS</Link>
                <Link className = "nav-links cart-link"  to = "/cart"><FaShoppingCart className='cart-icon' /><span className='cart-qty'>{quantity}</span></Link>
              
                {
                  window.localStorage.length > 0 ?
                  (
                    <Link className = "nav-links" to= "/"><button className='common-btn' onClick={handleLogout}>LOGOUT</button></Link>
                  ) : 
                  (
                    <Link className = "nav-links" to= "/login"><button className='common-btn'>LOGIN</button></Link>
                  )
                }
            </div>
        </nav> 
    </>
  )
  
}

export default Navbar
