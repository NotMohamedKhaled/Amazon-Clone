const gridd= document.querySelector('.products-grid');
let gridHtml='';
products.forEach((item)=>{
    gridHtml+= `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${item.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${item.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
               src="images/ratings/rating-${(item.rating.stars*10)}.png">
            <div class="product-rating-count link-primary">
              ${item.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${(item.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id="${item.id}">
            Add to Cart
          </button>
        </div>`;
})


gridd.innerHTML=gridHtml;
console.log(gridd.innerHTML);

const addToCartBtn = document.querySelectorAll('.add-to-cart-button');

addToCartBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    const currentProduct = btn.dataset.productId;
    if (!currentProduct) {
      console.log("Product ID is undefined");
      return;
    }
    // Check if the product already exists in the cart
    let productExists=null;
    cart.forEach((itemm) => {
      if (itemm.id === currentProduct) {
        productExists = itemm;
      }
    });

    if(productExists){
        productExists.quantity += 1; // Increment quantity if it exists
    }
    else if (!productExists) {
      cart.push({
        id: currentProduct,
        quantity: 1,
        // Add additional product details here if needed
      });
    }


    let cartQuantityLength= 0;
    cart.forEach((item)=>{
    cartQuantityLength += item.quantity;
    })
    const cartQuantity = document.querySelector('.cart-quantity').innerHTML=cartQuantityLength;
    console.log(cartQuantity)
    
    

    console.log(cart); // Output the updated cart
    
  });
});




