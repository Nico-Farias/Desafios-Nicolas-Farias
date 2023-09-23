import Controllers from "./class.controllers.js";
import ProductServices from '../services/product.services.js';
import {createProductFaker} from "../services/product.services.js";
import {createResponse} from "../utils.js";
const productService = new ProductServices();

export default class ProductControllers extends Controllers {
    constructor() {
        super(productService)
    }


}

export const createProduct = async (req, res, next) => {
    try {
        const {cant} = req.query;
        const response = await createProductFaker(cant)
        createResponse(res, 200, {
            msg: 'Product Faker',
            response
        })

    } catch (error) {
        next(error.message)
    }


}
