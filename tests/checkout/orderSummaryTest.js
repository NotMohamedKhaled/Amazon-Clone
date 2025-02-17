import { renderCartItems } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage,cart } from "../../data/cart.js";


describe('test suite: renderCartItem ', ()=>{
    const p1='1dsd';
    const p2='2ds';  
    beforeEach(() => {
        // Set up the test container
        document.querySelector('.js-test-container').innerHTML = `
            <div class="order-summary"></div>
            <div class="payment-summary"></div>
            <div class="checkout-header js-checkout-header">

        `;
        // Mock localStorage.getItem to return the cart data
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: "1dsd",
                    quantity: 4,
                    deliveryOptionId: '2'
                },
                {
                    productId: "2ds",
                    quantity: 1,
                    deliveryOptionId: '1'
                }
            ]);
        });
    });
    afterEach(()=>{
        document.querySelector('.js-test-container').innerHTML = '';

    });
    it('display the cart', ()=>{
    
    
           
        
           loadFromStorage();
           renderCartItems();
           expect(document.querySelector('.order-summary').innerHTML).not.toBe('');
        
        });


    it('checking quantity',()=>{
      

        loadFromStorage();
        renderCartItems();
        const quantityLabel = document.querySelector(`.js-quantity-label-${p1}`);
        expect(quantityLabel.innerText).toContain(4);
      //  document.querySelector('.js-test-container').innerHTML = '';

    });


    it('remove a product', ()=>{
         loadFromStorage();
        renderCartItems();
        document.querySelector(`.js-delete-link-${p1}`).click();
        expect(
            document.querySelectorAll('.order-summary').length
        ).toEqual(1);
        expect(document.querySelector(`.cart-item-container-${p1}`)).toEqual(null);
        expect(document.querySelector(`.cart-item-container-${p2}`)).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(p2);


       // document.querySelector('.js-test-container').innerHTML = '';
//
    })
});