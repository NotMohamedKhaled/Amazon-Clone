import { amazonHeader } from "./home/amazonheader.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
export function UpdateHeaders(){
    amazonHeader();
    renderCheckoutHeader();
}