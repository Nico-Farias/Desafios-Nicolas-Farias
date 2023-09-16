import MongoDao from './mongo.dao.js';
import {ProductModel} from './models/product.model.js';

export default class ProductDaoMongo extends MongoDao {
    constructor() {
        super(ProductModel)
    }

    async filtroCategory(Category) {
        try {
            const response = await this.model.aggregate([{
                    $match: {
                        Category: `${Category}`
                    }
                },])
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async filtroPriceMaxAMin() {
        try {
            const response = await this.model.aggregate([
                {
                    $addFields: { // Convierte el campo 'price' a tipo numérico
                        price: {
                            $toDouble: "$price"
                        }
                    }
                }, {
                    $sort: {
                        price: -1 // Ordena el precio en orden ascendente (mínimo a máximo)
                    }
                }
            ]);
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async filtroPriceMinAMax() {
        try {
            const response = await this.model.aggregate([
                {
                    $addFields: { // Convierte el campo 'price' a tipo numérico
                        price: {
                            $toDouble: "$price"
                        }
                    }
                }, {
                    $sort: {
                        price: 1 // Ordena el precio en orden ascendente (mínimo a máximo)
                    }
                }
            ]);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllPaginate(page = 1, limit = 10) {
        try {
            const response = await this.model.paginate({}, {page, limit})
            return response
        } catch (error) {
            console.log(error)
        }
    }


}
