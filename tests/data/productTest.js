import {Appliances,Product,Clothing} from "../../data/products.js"

describe('testing product , clothes and appliance classes', ()=>{
 let prod;
 beforeEach(()=>{
 prod = new Product( {
    id: "1dsd",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090,
    keywords: [
      "socks",
      "sports",
      "apparel"
    ]
  }); });


    it('products',()=>{
       
  expect(prod.extraInfoHTML()).toBe('');


    });
let clothing;
    beforeEach(() => {
    clothing = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56
      },
      priceCents: 799,
      keywords: [
        "tshirts",
        "apparel",
        "mens"
      ],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png"
    });
  });

it('gets the price', () => {
    expect(clothing.getPrice()).toEqual('$7.99');
  });



})