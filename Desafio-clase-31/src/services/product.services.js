import Services from './class.services.js';
import {productFaker} from '../utils.js';
import persistence from '../persistence/daos/persistence.js'
const {prodDao} = persistence;

export default class ProductServices extends Services {
    constructor() {
        super(prodDao)
    }


}

export const createProductFaker = async (cant = 100) => {

    try {
        const product = [];
        for (let i = 0; i < cant; i++) {
            const prod = productFaker();
            product.push(prod)
        }
        return product;
    } catch (error) {
        console.log(error)
    }
}
