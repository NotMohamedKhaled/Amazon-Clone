import {cart, addToCart,checkoutItemsQuantity} from '../../data/cart.js';
import {products} from '../../data/products.js';
import { UpdateHeaders } from '../updateHeaders.js';
import { amazonHeader } from './amazonheader.js';
import { renderCheckoutHeader } from '../checkout/checkoutHeader.js';

export function amazonMain(){

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
                   src="${item.getStarsUrl()}">
                <div class="product-rating-count link-primary">
                  ${item.rating.count}
                </div>
              </div>
    
              <div class="product-price">
               ${item.getPrice()}
              </div>
    
              <div class="product-quantity-container">
                <select class="dropdownQuantity${item.id}">
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
    
              <div class="added-to-cart added-to-cart-${item.id}">
                <img src="images/icons/checkmark.png">
                Added
              </div>
    
              <button class="add-to-cart-button button-primary" data-product-id="${item.id}">
                Add to Cart
              </button>
            </div>`;
    })
    
    
    gridd.innerHTML=gridHtml;
    const addedMessageTimeouts={};
    
    
    
    function addedToCartAppear(currentProduct,addedToCart){
      addedToCart.classList.add('addedToCartappear');
        
      const previousTimeoutId = addedMessageTimeouts[currentProduct];
      if (previousTimeoutId) {
        clearTimeout(previousTimeoutId);
      }
    
      const timeoutId = setTimeout(() => {
        addedToCart.classList.remove('addedToCartappear');
      }, 1000);
    
      // Save the timeoutId for this product
      // so we can stop it later if we need to.
      addedMessageTimeouts[currentProduct] = timeoutId;
    }
    
    
    
    
    
    
    
    const addToCartBtn = document.querySelectorAll('.add-to-cart-button');
    
    addToCartBtn.forEach((btn) => {
    
      btn.addEventListener('click', () => {
        //getting the current product id
        const currentProduct = btn.dataset.productId;
        const dropdownValue =Number(document.querySelector(`.dropdownQuantity${currentProduct}`).value);
        const addedToCart=document.querySelector(`.added-to-cart-${currentProduct}`);
    
        if (!currentProduct) {
          console.error("Product ID is undefined");
          return;
        }
    
        addToCart(currentProduct,dropdownValue);
        addedToCartAppear(currentProduct,addedToCart);
        console.log(919);
        amazonHeader();

      });
    });
}
