import { cart} from "../../data/cart-class.js";
import { getProduct, loadProducts } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

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
    console.log(productPriceCents);
    console.log(shippingPriceCents);

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

            <button class="place-order-button button-primary">
                Place your order
            </button>
        
        
    `;
    document.querySelector('.payment-summary').innerHTML=paymentSummaryHtml;
}
