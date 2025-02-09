import {renderCheckoutHeader} from '../scripts/checkout/checkoutHeader.js'
export let cart;
loadFromStorage();
export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart')) || [
    //  { productId: "1dsd",
    //   quantity: 2,
    //   deliveryOptionId: '2'
    //  },
    //  {
    //   productId: "2ds",
    //   quantity: 1,
    //   deliveryOptionId: '1'
    
    //  }
    ];
    
}

export function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(currentProduct,dropdownValue){
    // Check if the product already exists in the cart
    let productExists;
    cart.forEach((cartItem) => {
      if (cartItem.productId === currentProduct) {
        productExists = cartItem;
      }
    });
   
    if(productExists){
        productExists.quantity += dropdownValue; // Increment quantity if it exists
    }
    else if (!productExists) {
      cart.push({
        productId: currentProduct,
        quantity: dropdownValue,
        deliveryOptionId: '1',
        // Add additional product details here if needed
       
      });
    }
    saveToLocalStorage();

   }


  export function deleteCartItem(productId){
cart.forEach((cartItem,index)=>{
    if(cartItem.productId===productId){
       cart.splice(index,1);
        saveToLocalStorage();
        // renderCheckoutHeader();

        return;
    }
})

   }

   export function checkoutItemsQuantity(){
    let cartQuantityLength= 0;
      cart.forEach((cartItem)=>{
      cartQuantityLength += cartItem.quantity;
      })
     return cartQuantityLength;
  }

  export function updateQuantity(productId, newQuantity) {
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
      
    });
  
    matchingItem.quantity = newQuantity;

    document.querySelector(`.js-quantity-label-${productId}`).innerHTML=newQuantity;

    document.querySelector('.return-to-home-link').innerHTML=checkoutItemsQuantity();

    // renderCheckoutHeader();

    saveToLocalStorage();
  }

  export function updateDeliveryOption(productId,deliveryOptionId){
    let productExists;
    cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        productExists = cartItem;
      }
    });
    productExists.deliveryOptionId=deliveryOptionId;
    saveToLocalStorage();
   
  }
