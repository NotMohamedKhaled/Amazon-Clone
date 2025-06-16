import { renderCartItems } from "./checkout/orderSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {renderCheckoutHeader} from './checkout/checkoutHeader.js'
import { loadCartFetch } from "../data/cart.js";



async function loadPage() {
 try{
   await Promise.all([
    loadProductsFetch(),
    loadCartFetch()
    ])
    
   
 }catch(error){
    console.log('Unexpected Error, Try again later');
 }
   
    renderCheckoutHeader(); 
    renderCartItems();
    renderPaymentSummary();

}

loadPage();


// Promise.all([

//     loadProductsFetch(),
//     loadProductsFetch()
// ]).then(()=>{
    // renderCheckoutHeader(); 
    // renderCartItems();
    // renderPaymentSummary();
// });



// new Promise((resolve)=>{
//     loadProducts(()=>{
//         resolve('val 1');
//     }); 

// }).then((val)=>{
//     console.log(val);
//     new Promise((resolve)=>{
//         loadCart(()=>{
//             resolve();
//         });
//     });

// }).then(()=>{
//     renderCheckoutHeader(); 
//     renderCartItems();
//     renderPaymentSummary();
// })


// loadProducts(()=>{
//     loadCart(()=>{
//          renderCheckoutHeader();
//     renderCartItems();
//     renderPaymentSummary();
//     });
   

// });

