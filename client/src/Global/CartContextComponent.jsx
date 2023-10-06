import React, { createContext, useReducer } from 'react'
import { CartReducer } from './CartReducer';
export const cartContext = createContext();
const CartContextComponent = (props) => {
    const [ state,dispatch ] = useReducer(CartReducer,{shopingCart:[],totalPrice:0,quantity:0})
  return (
    <>
      <cartContext.Provider value={{...state,dispatch}}>
         {props.children}  
      </cartContext.Provider> 
    </>
  )
}

export default CartContextComponent
