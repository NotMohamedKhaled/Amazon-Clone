export let cart = JSON.parse(localStorage.getItem('cart')) || [
  // {
  //   productId: '1dsd',
  //   quantity: 2,
  // },
  // {
  //   productId: '2ds',
  //   quantity: 1,
  // },
];

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
        // Add additional product details here if needed
       
      });
    }
    saveToLocalStorage();
console.log(cart);
   }

  export function deleteCartItem(productId){
cart.forEach((cartItem,index)=>{
    if(cartItem.productId===productId){
       cart.splice(index,1);
        saveToLocalStorage();
        return;
    }
})

   }
