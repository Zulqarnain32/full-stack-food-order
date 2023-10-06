import React, { useContext } from 'react'
import { cartContext } from '../Global/CartContextComponent'

const Cart = () => {
    const {shopingCart,totalPrice,quantity,dispatch} = useContext(cartContext)
    console.log(shopingCart);
  return (
    <>
      <div className="cart-containerr">
        {
            shopingCart.map((product) => (
                <>
                   <div>
                       <img src={product.img} alt="" />
                       <h5>{product.name}</h5>
                   </div>
                </>
            ))
        }
      </div>
    </>
  )
}

export default Cart
