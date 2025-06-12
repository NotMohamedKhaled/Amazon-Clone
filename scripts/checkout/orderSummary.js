// checkout.js
import { cart} from '../../data/cart-class.js';
import {  getProduct} from '../../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import {renderCheckoutHeader} from './checkoutHeader.js';





export function renderCartItems() {
  // const returnHomeLink=document.querySelector('.return-to-home-link');
    const today= dayjs();
  let cartSummaryHtml = '';
  cart.cartItems.forEach((cartItem, index) => {
    const productId = cartItem.productId;
    const matchingProduct =getProduct(productId);
    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryoption = getDeliveryOption(deliveryOptionId);
    if (!deliveryoption) {
      console.error(`No delivery option found for ID: ${deliveryOptionId}`);
      deliveryoption = deliveryOptions[0]; // Use the first option as a fallback
    }
    const deliveryDate =today.add(deliveryoption.deliveryDays,'days');
     const dateHtml =(deliveryDate.format('dddd, MMMM D'));
    if (matchingProduct) {
    

      cartSummaryHtml += `
        <div class="cart-item-container cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">Delivery date: ${dateHtml}</div>
          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">
            <div class="cart-item-details">
              <div class="product-name">${matchingProduct.name}</div>
              <div class="product-price">${matchingProduct.getPrice()}</div>
              <div class="product-quantity">
                <span>Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span></span>
                <span class="update-quantity-link link-primary" data-product-id="${productId}">Update</span>
                <input type="number" min="1" max="49" class="quantity-input js-quantity-input-${matchingProduct.id}"  data-product-id="${productId}">
                <span class="save-quantity link-primary" data-product-id="${productId}">Save</span>
                <span class="delete-quantity-link js-delete-link-${matchingProduct.id}
                 link-primary" data-product-id="${productId}">Delete</span>
              </div>
              <p class="alert js-alert-${matchingProduct.id}"></p>
            </div>
            <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
        ${generateDeliveryHtml(matchingProduct.id,index,cartItem)}
        </div>
    </div>
    </div>`;
}
  })



  document.querySelector('.order-summary').innerHTML = cartSummaryHtml;

  // Add event listeners for delete buttons
  document.querySelectorAll('.delete-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      cart.deleteCartItem(productId);
      renderCheckoutHeader();
      renderPaymentSummary();
      renderCartItems();
    
    });
  });

function generateDeliveryHtml(matchingProduct,index,cartItem){
  let html=``;

  deliveryOptions.forEach((option)=>{

  const deliveryDate =today.add(option.deliveryDays,'days');
  const dateHtml =(deliveryDate.format('dddd, MMMM D'));
  const priceHtml= (option.priceCents===0?'FREE ':'$'+(option.priceCents / 100).toFixed(2)+' -');
   const isChecked=  option.id===cartItem.deliveryOptionId;

    html+= `    <div class="delivery-option js-delivery-option"
                    data-product-id="${matchingProduct}"
                    data-delivery-option-id="${option.id}">
              <input type="radio"
              ${isChecked?'checked':''}
              
              class="delivery-option-input"
              name="delivery-option-${index}">
              <div>
              <div class="delivery-option-date">
                ${dateHtml}
              </div>
              <div class="delivery-option-price">
                  ${priceHtml} Shipping
              </div>
              </div>
              </div>
          `;
        
  })
  return html;
}



// Initial render
// renderCartItems();


function update(productId){
  document.querySelector(`.cart-item-container-${productId}`).classList.add('is-editing-quantity');
}


const updateBtn= document.querySelectorAll('.update-quantity-link');
updateBtn.forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId = link.dataset.productId;
    update(productId);
    // renderCheckoutHeader();

  });
});


function save(productId){ 
 document.querySelector(`.cart-item-container-${productId}`).classList.remove('is-editing-quantity');
}


function handleQuantityUpdate(productId) {
  const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
  const alertElement = document.querySelector(`.js-alert-${productId}`);
  const newQuantity = Number(quantityInput.value);

  if (newQuantity < 1 || newQuantity >= 50) {
    // Show error message
    alertElement.innerHTML = 'Invalid Quantity.';
    setTimeout(() => {
      alertElement.innerHTML = '';
    }, 1500);

    // Reset quantity to 1 if invalid
    cart.updateQuantity(productId, 1);
  } else {
    // Update quantity if valid
    cart.updateQuantity(productId, newQuantity);
  }

  // Save changes
  save(productId);
  renderCheckoutHeader();


}

// Attach event listeners to save buttons
document.querySelectorAll('.save-quantity').forEach((btn) => {
  btn.addEventListener('click', () => {
    const productId = btn.dataset.productId;
    handleQuantityUpdate(productId);
    renderPaymentSummary();
  });
});

// Attach event listeners to quantity inputs for Enter key
document.querySelectorAll('.quantity-input').forEach((input) => {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const productId = input.dataset.productId;
      handleQuantityUpdate(productId);    
       renderPaymentSummary();

    }
  });
});

document.querySelectorAll('.js-delivery-option')
.forEach((option)=>{
  option.addEventListener('click',()=>{
    const {productId,deliveryOptionId}=option.dataset;
    cart.updateDeliveryOption(productId,deliveryOptionId);      
    renderPaymentSummary();
    renderCartItems();
  });

})
}


