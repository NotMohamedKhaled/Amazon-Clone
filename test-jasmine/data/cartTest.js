import { addToCart,cart,loadFromStorage } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
describe('test suite: addToCart', ()=>{


    it('adds an existing product to the cart',()=>{
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: '1dsd',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
            
           });
           
        
           loadFromStorage();
           addToCart('1dsd',1);
           expect(cart.length).toEqual(1);
           expect(localStorage.setItem).toHaveBeenCalledTimes(1);
           expect(cart[0].quantity).toEqual(2);

    });



    it('adds a new products to the cart', ()=>{
        spyOn(localStorage,'setItem');
       spyOn(localStorage,'getItem').and.callFake(()=>{
        return JSON.stringify([]);
       });
       
    
       loadFromStorage();
        addToCart('1dsd',10);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
   
})