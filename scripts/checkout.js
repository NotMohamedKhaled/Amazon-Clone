// checkout.js
import { cart, deleteCartItem } from '../data/cart.js';
import { products } from '../data/products.js';

function renderCartItems() {
  let cartSummaryHtml = '';
  cart.forEach((cartItem, index) => {
    const productId = cartItem.productId;
    const matchingProduct = products.find((product) => product.id === productId);

    if (matchingProduct) {
      cartSummaryHtml += `
        <div class="cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">Delivery date: Tuesday, June 21</div>
          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">
            <div class="cart-item-details">
              <div class="product-name">${matchingProduct.name}</div>
              <div class="product-price">$${(matchingProduct.priceCents / 100).toFixed(2)}</div>
              <div class="product-quantity">
                <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
                <span class="update-quantity-link link-primary">Update</span>
                <span class="delete-quantity-link link-primary" data-product-id="${productId}">Delete</span>
              </div>
            </div>
            <div class="delivery-options">
              <div class="delivery-options-title">Choose a delivery option:</div>
              <div class="delivery-option">
                <input type="radio" checked class="delivery-option-input" name="delivery-option-${index}">
                <div>
                  <div class="delivery-option-date">Tuesday, June 21</div>
                  <div class="delivery-option-price">FREE Shipping</div>
                </div>
              </div>
              <!-- Add more delivery options here -->
            </div>
          </div>
        </div>
      `;
    }
  });

  document.querySelector('.order-summary').innerHTML = cartSummaryHtml;

  // Add event listeners for delete buttons
  document.querySelectorAll('.delete-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      deleteCartItem(productId);
      renderCartItems(); // Re-render the cart after deletion
    });
  });
}

// Initial render
renderCartItems();