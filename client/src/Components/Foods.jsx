import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom"
import { FoodApi } from './FoodApi'
import { FaShoppingCart, FaTrash } from "react-icons/fa"
import { RxCross2 } from "react-icons/rx"
import { cartContext } from '../Global/CartContextComponent'

const Foods = () => {

  const [data, setData] = useState(FoodApi)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartshow, setCartShow] = useState(true)
  const [cartshowanimate, setCartShowAnimate] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)


  const { dispatch } = useContext(cartContext)
  const { shopingCart, quantity, totalPrice } = useContext(cartContext)


  //search your fav food
  const filteredData = data.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(search.toLowerCase());
    const categoryMatch =
      selectedCategory === 'All' || product.category === selectedCategory;

    return nameMatch && categoryMatch;



  });

  //category
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  if (showSuccessMessage) {
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 1000)
  }

  return (
    <>
      <div className='food-parent-container'>
        <div className="nav-and-search">
          <div className="foot-nav">
            <button onClick={() => handleCategoryClick('All')}>All</button>
            <button onClick={() => handleCategoryClick('Lunch')}>Lunch</button>
            <button onClick={() => handleCategoryClick('Breakfast')}>Breakfast</button>
            <button onClick={() => handleCategoryClick('Dinner')}>Dinner</button>
            <button onClick={() => handleCategoryClick('Snacks')}>Snacks</button>
          </div>
          <div className="total-foods">{filteredData.length > 0 ? (<p>Total {filteredData.length} Items</p>) : (<p>No product found</p>)}</div>
          <div className="searchbar">
            <input
              type="text"
              placeholder='search food'
              className='search-field'
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="food-container">
          {filteredData.map(product => (
            <div className='single-food' key={product.id}>
              <div className='food-img-box'>
                <img src={product.img} className='food-img' alt={product.name} />
              </div>
              <div className={`success-message ${showSuccessMessage ? "s-message" : ""}`}>
                <p>{showSuccessMessage}</p>
              </div>
              <div className="name-and-price">
                <p className='food-name'>{product.name}</p>
                <p className='food-price'>Rs {product.price}</p>
              </div>
              <p className="food-description">{product.desc.slice(0, 40)}...</p>
              <div className="rating-and-price name-and-price">
                <p>⭐ {product.rating}</p>

                <button
                  className='add-to-cart'
                  onClick={() => {
                    dispatch({ type: "ADD_TO_CART", id: product.id, product });
                    setShowSuccessMessage(`${product.name}  added to your cart`);
                  }}
                >
                  Add to cart
                </button>

              </div>
            </div>
          ))}
        </div>



        <div
          className={`cart-detail ${shopingCart && shopingCart.length > 0 ? "cart-btn-animate" : ""}`}

          onClick={() => setCartShowAnimate(true)}
        >
          <FaShoppingCart />
        </div>

      </div>

      {
        cartshow && (
          <>
            <div className={`cart-container ${cartshowanimate ? "animate" : ""}`}>
              <p className='summary'>Cart Summary</p>

              <div>

                {
                  shopingCart && shopingCart.map((product) => (
                    <div className='cart-item' key={product.id}>
                      <img src={product.img} className="cart-img" />
                      <div className="single-item-detail">
                        <p className="cart-item-name">{product.name}</p>
                        <p className="cart-item-price">Rs {product.price}</p>
                        <button className='btn incr' onClick={() => dispatch({ type: "INCR", id: product.id, product })}>+</button>
                        <p className="cart-item-qty">{product.quantity}</p>
                        <button className='btn decr' onClick={() => dispatch({ type: "DECR", id: product.id, product })}>-</button>
                        <div className='delete' onClick={() => dispatch({ type: "DELETE", id: product.id, product })}><FaTrash /></div>
                      </div>
                    </div>
                  ))
                }

              </div>
              {
                shopingCart.length > 0 ? (<div className="price-and-quantity">
                  <div className="totalprice">
                    <p>Total Price</p>
                    <p className='company bold'>{totalPrice}</p>
                  </div>
                  <div className="totalitems">
                    <p>Total Items</p>
                    {/* <p className='company bold'>{Math.round(quantity)}</p> */}
                    <p className='company bold'>{quantity}</p>
                  </div>
                </div>) : <h3>Your cart is currently empty</h3>
              }

              {
                shopingCart.length > 0 ? (
                  <div className="order-successful">
                  <Link to = "/success">
                      <button className='check-btn common-btn'>Check Out</button>
                  </Link>
                </div>
                ) : ""
              }
             

              <button className="remove-cart" onClick={() => setCartShowAnimate(false)}><RxCross2 /></button>
            </div>
          </>
        )
      }


    </>
  )
}

export default Foods
