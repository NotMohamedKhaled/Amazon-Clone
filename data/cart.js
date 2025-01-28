export const cart=[];

export function addToCart(currentProduct,dropdownValue){
    // Check if the product already exists in the cart
    let productExists=null;
    cart.forEach((cartItem) => {
      if (cartItem.id === currentProduct) {
        productExists = cartItem;
      }
    });
   
    if(productExists){
        productExists.quantity += dropdownValue; // Increment quantity if it exists
    }
    else if (!productExists) {
      cart.push({
        id: currentProduct,
        quantity: dropdownValue,
        // Add additional product details here if needed
      });
    }
   
   }