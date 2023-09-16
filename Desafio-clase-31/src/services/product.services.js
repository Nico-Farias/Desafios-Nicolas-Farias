import Services from './class.services.js';
import persistence from '../persistence/daos/persistence.js'
const {prodDao} = persistence;

export default class ProductServices extends Services {
    constructor() {
        super(prodDao)
    }


}
