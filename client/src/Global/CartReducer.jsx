export const CartReducer = (state, action) => {
  const { shopingCart, totalPrice, quantity } = state;
  

  let userProduct;
  let updatedPrice;
  let updatedQuantity;

  switch (action.type) {
    case "ADD_TO_CART":
      console.log("increment");
      const check = shopingCart.find((product) => product.id == action.id);

      if (check) {
        console.log("this item is already included");
        return state;
      } else {
        userProduct = action.product;
        userProduct["quantity"] = 1;
        updatedQuantity = quantity + 1;
        updatedPrice = totalPrice + userProduct.price;
        return {
          shopingCart: [userProduct,...shopingCart],
          totalPrice: updatedPrice,
          quantity: updatedQuantity,
        };
      }
      break;
    case "INCR":
      console.log("increase");
      userProduct = action.product;
      userProduct.quantity = userProduct.quantity + 1;
      updatedPrice = totalPrice + userProduct.price;
      updatedQuantity = quantity + 1;

      return {
        shopingCart: [...shopingCart],
        totalPrice: updatedPrice,
        quantity: updatedQuantity,
      };
      break;
    case "DECR":
      userProduct = action.product;
      console.log(userProduct);
      if(userProduct.quantity > 1){

      
        console.log("decrease");
        updatedPrice = totalPrice - userProduct.price;
        userProduct.quantity = userProduct.quantity - 1;
        updatedQuantity = quantity - 1;

        return {
          shopingCart: [...shopingCart],
          totalPrice: updatedPrice,
          quantity: updatedQuantity,
        };
    
        } else {
            return state
          }
      
      break;
    
    case 'DELETE':
      console.log("remove");

      const filteredItem = shopingCart.filter(product => product.id !== action.id)
      userProduct = action.product
      updatedQuantity = quantity - userProduct.quantity
      updatedPrice = totalPrice - userProduct.price * userProduct.quantity;

      return {
        shopingCart: [...filteredItem],
        totalPrice: updatedPrice,
        quantity:updatedQuantity
      };
      break;
      default:
        return state;

  }
};
