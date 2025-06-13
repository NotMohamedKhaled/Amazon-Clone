import { loadProducts } from '../data/products.js';
import {amazonMain} from './home/amazonMain.js';
import {amazonHeader} from './home/amazonheader.js'

loadProducts(()=>{
    amazonHeader();
amazonMain();
});
