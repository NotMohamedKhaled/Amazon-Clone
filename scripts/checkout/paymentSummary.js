import { cart} from "../../data/cart-class.js";
import { getProduct, loadProducts } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary(){
    let productPriceCents=0;
    let shippingPriceCents=0;
    cart.cartItems.forEach((cartItem) => {
      const product=  getProduct(cartItem.productId);
      if (!product) {
    console.warn(`Product with id ${cartItem.productId} not found.`);
    return; // skip this cart item
  }
      productPriceCents+=Number(product.priceCents) * cartItem.quantity;
      const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
      shippingPriceCents+=deliveryOption.priceCents;
    });
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents *0.1;
    const totalCents = taxCents+totalBeforeTaxCents;
    

    const paymentSummaryHtml= `
            <div class="payment-summary-title">
                Order Summary
            </div>

            <div class="payment-summary-row">
                <div>Items ${cart.checkoutItemsQuantity()}:</div>
                <div class="payment-summary-money">$${(Math.round(productPriceCents)/100).toFixed(2)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">$${(Math.round(shippingPriceCents)/100).toFixed(2)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${(Math.round(totalBeforeTaxCents)/100).toFixed(2)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${(Math.round(taxCents)/100).toFixed(2)}</div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">$${(Math.round(totalCents)/100).toFixed(2)}</div>
            </div>

            <button class="place-order-button button-primary js-place-order-button">
                Place your order
            </button>
        
        
    `;
    document.querySelector('.payment-summary').innerHTML=paymentSummaryHtml;

    document.querySelector('.js-place-order-button')
    .addEventListener('click', async ()=>{
        if(cart.cartItems!=0){
             try{
        const response =await fetch('https://supersimplebackend.dev/orders',{
         method: 'POST',
         headers:{
         'Content-Type': 'application/json'
         },
         body: JSON.stringify({
         cart: cart
         })
        })

        const order =await response.json();
        addOrder(order);
        cart.clearCart();

        }catch{
            console.log("error")
            
        }
    window.location.href='orders.html'
   
        }
   
    });
}
