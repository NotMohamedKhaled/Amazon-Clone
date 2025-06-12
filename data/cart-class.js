class Cart{
    
    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey=localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [
           { productId: "1dsd",
            quantity: 2,
            deliveryOptionId: '2'
           },
           {
            productId: "2ds",
            quantity: 1,
            deliveryOptionId: '1'
          
           }
          ];
          
      }
      saveToLocalStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
      }
    
    
    addToCart(currentProduct,dropdownValue){
        // Check if the product already exists in the cart
        let productExists;
        this.cartItems.forEach((cartItem) => {
          if (cartItem.productId === currentProduct) {
            productExists = cartItem;
          }
        })
       
        if(productExists){
            productExists.quantity += dropdownValue; 
        }
        else if (!productExists) {
          this.cartItems.push({
            productId: currentProduct,
            quantity: dropdownValue,
            deliveryOptionId: '1',
           
          });
        }
        this.saveToLocalStorage();
    
       };
    
    
        deleteCartItem(productId){
        this.cartItems.forEach((cartItem,index)=>{
            if(cartItem.productId===productId){
               this.cartItems.splice(index,1);
                this.saveToLocalStorage();
        
                return;
            }
        })
        
        };
    
    
        checkoutItemsQuantity(){
            let cartQuantityLength= 0;
              this.cartItems.forEach((cartItem)=>{
              cartQuantityLength += cartItem.quantity;
              })
             return cartQuantityLength;
          };
    
    
        updateQuantity(productId, newQuantity) {
            let matchingItem;
          
            this.cartItems.forEach((cartItem) => {
              if (productId === cartItem.productId) {
                matchingItem = cartItem;
              }
              
            })
          
            matchingItem.quantity = newQuantity;
        
            document.querySelector(`.js-quantity-label-${productId}`).innerHTML=newQuantity;
        
            document.querySelector('.return-to-home-link').innerHTML=this.checkoutItemsQuantity();
        
            // renderCheckoutHeader();
        
            this.saveToLocalStorage();
          };
        
        
        
          updateDeliveryOption(productId,deliveryOptionId){
            let productExists;
            this.cartItems.forEach((cartItem) => {
              if (cartItem.productId === productId) {
                productExists = cartItem;
              }
            });
            productExists.deliveryOptionId=deliveryOptionId;
            this.saveToLocalStorage();
           
          };
        
    };

    




export const cart=[
  
].map((cartItems)=>{
return new cart(cartItems);
});





  

 

  

