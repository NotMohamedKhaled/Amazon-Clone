import { renderCartItems } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage,cart } from "../../data/cart.js";
import { loadProducts } from "../../data/products.js";


describe('test suite: renderCartItem ', ()=>{
    const p1='e43638ce-6aa0-4b85-b27f-e1d07eb678c66';
    const p2='15b6fc6f-327a-4ec4-896f-486349e85a3d';  
    beforeAll((done)=>{
        loadProducts();
        done();
    });
    beforeEach(() => {
        
        spyOn(localStorage,'setItem');
        document.querySelector('.js-test-container').innerHTML = `
            <div class="order-summary"></div>
            <div class="payment-summary"></div>

        `;
        // Mock localStorage.getItem to return the cart data
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c66",
                    quantity: 4,
                    deliveryOptionId: '2'
                },
                {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
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