import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart-class.js";
console.log(orders);

    innializePage();


   async function innializePage() {
        await loadProductsFetch();
        renderOrdersPage();
    }

 function buyAgain(productId){
    console.log(productId);
    console.log(cart.cartItems);
    cart.addToCart(productId,1);
    window.location.href='checkout.html';
    console.log('buy again');
}

function formatOrderDate(orderDate){
    const date= new Date(orderDate);
    return date.toLocaleDateString('en-US',{month: 'long' , day:'numeric'});
}

function renderOrderProducts(products){
      let productsInOrderHtml='';
      
           products.forEach((product)=>{

            const currentProduct = getProduct(product.productId); 
            productsInOrderHtml+=`
                
            <div class="product-image-container">
              <img src='${currentProduct.image}'>
            </div>

            <div class="product-details">
              <div class="product-name">
                ${currentProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${formatOrderDate(product.estimatedDeliveryTime)}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again-button" data-product-id='${product.productId}'>
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          `
           })
           return productsInOrderHtml;
        }



function renderOrdersPage(){
    const cartQuantity = document.querySelector('.js-cart-quantity');
    cartQuantity.innerHTML=cart.checkoutItemsQuantity();
    const ordersGrid= document.querySelector('.orders-grid');
    let ordersGridHtml='';
    orders.forEach((order)=>{
    ordersGridHtml+=
    `
    <div class="order-container">

            <div class="order-header">
                <div class="order-header-left-section">
                <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${formatOrderDate(order.orderTime)}</div>
                </div>
                <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${((order.totalCostCents)/100).toFixed(2)}</div>
                </div>
                </div>

                <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.id}</div>
                </div>
            </div>
                <div class="order-details-grid">
                ${renderOrderProducts(order.products)}
                </div>
        
            
            </div>
    `
    });
    ordersGrid.innerHTML=ordersGridHtml;


    const buyAgainButtons = document.querySelectorAll('.js-buy-again-button');
    buyAgainButtons.forEach((button)=>{
        button.addEventListener('click',()=>{
            const productId=button.dataset.productId;
            console.log(productId);
            buyAgain(productId);
            
        })
    })

        }



