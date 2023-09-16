import Controllers from "./class.controllers.js";
import ProductServices from '../services/product.services.js';
const productService = new ProductServices();

export default class ProductControllers extends Controllers {
    constructor() {
        super(productService)
    }
}
