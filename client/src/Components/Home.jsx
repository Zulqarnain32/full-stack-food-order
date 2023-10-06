import React from 'react'
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="home-content">
          <h1>Elevate Your <span className="company">Pizza</span> Experience with Us</h1>
             <p className="content">
                Welcome to PizzaMasters, where passion meets perfection in every slice. Our artisanal pizzas are crafted with the finest ingredients, hand-stretched dough, and a blend of mouthwatering toppings that will transport your taste buds to a world of flavor. Indulge in a symphony of flavors, where every bite is a masterpiece. Taste the difference at PizzaWave today.
             </p>
            <Link to = "/foods"><button className="order common-btn">Order Now</button></Link>
        </div>  
        <div className="home-image">
           <img src="/assets/home.avif" className='home-img'/>
        </div>
      </div> 
    </>
  )
}

export default Home

