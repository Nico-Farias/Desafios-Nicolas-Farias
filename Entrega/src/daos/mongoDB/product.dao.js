import {CartModel} from './models/cart.model.js';
import {ProductModel} from './models/product.model.js';
import mongoose from 'mongoose';

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
            const cart = await CartModel.findById(idCart);

            if (! cart) {
                throw new Error('El carrito no existe');
            }


            // Verifica si el producto existe en la base de datos antes de agregarlo al carrito
            const existingProduct = await ProductModel.findById(idProduct);

            if (! existingProduct) {
                throw new Error('El producto no existe');
            }

            // Verifica si el producto ya existe en el carrito por su id
            const existingProductInCart = cart.products.find(product => product._id.equals(idProduct));

            if (existingProductInCart) { // Si el producto ya existe, incrementa su cantidad en 1
                existingProductInCart.qty += 1;
            } else { // Si el producto no existe en el carrito, agrega el producto al carrito con qty: 1
                cart.products.push({_id: idProduct, qty: 1});
                console.log(cart.products)
            }

            await cart.save();


            return cart;
        } catch (error) {
            console.log(error);
            throw error; // Re-lanzamos el error para que sea capturado por el controlador
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
