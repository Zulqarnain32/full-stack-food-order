import React from 'react'

const SuccessMessage = () => {
  return (
    <div className='success-container'>
       <div className='success-content'>
           <img src = "/assets/s-msg.avif" className='success-img'/>
           {/* <img src = "/assets/success.avif" className='success-img'/> */}
           {/* <img src = "/assets/success-msg.jpg" className='success-img'/> */}
           <h2 className='s-title company'>Order Successful!</h2>
           <p>Your order has successfully placed.</p>
       </div>
    </div>
  )
}

export default SuccessMessage
