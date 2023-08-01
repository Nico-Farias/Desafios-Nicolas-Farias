import mongoose from "mongoose";
import {CartModel} from "./models/cart.model.js";
import {ProductModel} from "./models/product.model.js";


export default class CartDao {

    async createCart(obj) {
        try {
            const response = await CartModel.create(obj)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async getAllCart() {
        try {
            const response = await CartModel.find({})
            return response
        } catch (error) {
            console.log(error)
        }
    }


    async getCartById(id) {
        try {
            const response = await CartModel.findById(id).populate('products')

            return response
        } catch (error) {
            console.log(error)
        }
    }


    async updateCart(cartId, productId, qty) {
        try {


            const response = await CartModel.findOneAndUpdate({
                _id: cartId,
                "products._id": productId
            }, {
                $inc: {
                    "products.$.qty": qty
                }
            }, {new: true});

            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async removeCart(id) {
        try {
            const response = await CartModel.findByIdAndDelete(id)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async removeProdInCart(idCart, idProd) {

        try {
            const response = await CartModel.findByIdAndUpdate(idCart, {
                $pull: {
                    products: idProd
                }

            }, {new: true});
            return response;
        } catch (error) {
            console.log(error);
        }
    }


}
