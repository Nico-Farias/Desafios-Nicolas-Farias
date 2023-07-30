import {CartModel} from './models/cart.model.js';
import {ProductModel} from './models/product.model.js';


export default class ProductDaoMongo {
    async create(product) {
        try {
            const response = await ProductModel.create(product)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async addProduct(idCart, idProduct) {
        try {

            const carts = await CartModel.findById(idCart)
            const product = await ProductModel.findById(idProduct)

            if (! carts || ! product) {
                throw new Error('El carrito o el producto no existen');
            }

            carts.products.push(idProduct);
            product.qty += 1;

            carts.save();
            product.save();


            return carts;
        } catch (error) {
            console.log(error)
        }
    }


    async getAll() {
        try {
            const response = await ProductModel.find({})
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            const response = await ProductModel.findById(id)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async update(id, product) {
        try {
            const response = await ProductModel.findByIdAndUpdate(id, product, {new: true})
            return response
        } catch (error) {
            console.log(error)
        }
    }
    async remove(id) {
        try {
            const response = await ProductModel.findByIdAndDelete(id)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async filtroCategory(Category) {
        try {
            const response = await ProductModel.aggregate([{
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
            const response = await ProductModel.aggregate([
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
            const response = await ProductModel.aggregate([
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
            const response = await ProductModel.paginate({}, {page, limit})
            return response
        } catch (error) {
            console.log(error)
        }
    }


}
