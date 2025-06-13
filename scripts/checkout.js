import { renderCartItems } from "./checkout/orderSummary.js";
import { loadProducts } from "../data/products.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {renderCheckoutHeader} from './checkout/checkoutHeader.js'

loadProducts(()=>{
    renderCheckoutHeader();
    renderCartItems();
    renderPaymentSummary();

});

