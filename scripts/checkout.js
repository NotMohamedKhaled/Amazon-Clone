// checkout.js
import { cart,updateDeliveryOption, deleteCartItem,checkoutItemsQuantity,updateQuantity,saveToLocalStorage} from '../data/cart.js';
import { products } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

const today= dayjs();



function renderCartItems() {
  let cartSummaryHtml = '';
  cart.forEach((cartItem, index) => {
    const productId = cartItem.productId;
    const matchingProduct = products.find((product) => product.id === productId);
    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryoption = deliveryOptions.find((option) => option.id === deliveryOptionId);
    if (!deliveryoption) {
      console.error(`No delivery option found for ID: ${deliveryOptionId}`);
      deliveryoption = deliveryOptions[0]; // Use the first option as a fallback
    }
    const deliveryDate =today.add(deliveryoption.deliveryDays,'days');
     const dateHtml =(deliveryDate.format('dddd, MMMM D'));
    if (matchingProduct) {
    

      cartSummaryHtml += `
        <div class="cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">Delivery date: ${dateHtml}</div>
          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">
            <div class="cart-item-details">
              <div class="product-name">${matchingProduct.name}</div>
              <div class="product-price">$${(matchingProduct.priceCents / 100).toFixed(2)}</div>
              <div class="product-quantity">
                <span>Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span></span>
                <span class="update-quantity-link link-primary" data-product-id="${productId}">Update</span>
                <input type="number" min="1" max="49" class="quantity-input js-quantity-input-${matchingProduct.id}"  data-product-id="${productId}">
                <span class="save-quantity link-primary" data-product-id="${productId}">Save</span>
                <span class="delete-quantity-link link-primary" data-product-id="${productId}">Delete</span>
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
      deleteCartItem(productId);
      document.querySelector(`.cart-item-container-${productId}`).innerHTML='';
      document.querySelector('.return-to-home-link').innerHTML=checkoutItemsQuantity();
     // renderCartItems(); // Re-render the cart after deletion
    });
  });
}

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
renderCartItems();


function update(productId){
  document.querySelector(`.cart-item-container-${productId}`).classList.add('is-editing-quantity');
}


const updateBtn= document.querySelectorAll('.update-quantity-link');
updateBtn.forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId = link.dataset.productId;
    update(productId);
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
    updateQuantity(productId, 1);
  } else {
    // Update quantity if valid
    updateQuantity(productId, newQuantity);
  }

  // Save changes
  save(productId);
}

// Attach event listeners to save buttons
document.querySelectorAll('.save-quantity').forEach((btn) => {
  btn.addEventListener('click', () => {
    const productId = btn.dataset.productId;
    handleQuantityUpdate(productId);
  });
});

// Attach event listeners to quantity inputs for Enter key
document.querySelectorAll('.quantity-input').forEach((input) => {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const productId = input.dataset.productId;
      handleQuantityUpdate(productId);
    }
  });
});
document.querySelector('.return-to-home-link').innerHTML=checkoutItemsQuantity();

document.querySelectorAll('.js-delivery-option')
.forEach((option)=>{
  option.addEventListener('click',()=>{
    const {productId,deliveryOptionId}=option.dataset;

updateDeliveryOption(productId,deliveryOptionId)
  });

})


