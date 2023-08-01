import * as service from "../services/cart.services.js";


export const create = async (req, res, next) => {
    try {
        const cart = {
            ...req.body
        }
        const newCart = await service.create(cart)
        res.status(200).json(newCart)
    } catch (error) {
        next(error.message)
    }
}


export const getAllCart = async (req, res, next) => {
    try {
        const allCarts = await service.getAllCart()
        res.json(allCarts)
    } catch (error) {
        next(error.message)
    }
}


export const getById = async (req, res, next) => {
    try {
        const {id} = req.params

        const cartId = await service.getById(id);
        if (! cartId) {
            res.status(404).json({msg: 'Cart not found'})
        } else {
            return res.status(200).json(cartId)
        }


    } catch (error) {
        next(error.message)
    }
}


export const updateCart = async (req, res, next) => {
    try {
        const {cartId, productId} = req.params;

        const {qty} = req.body;


        const updateQty = await service.updateCart(cartId, productId, qty)

        res.status(200).json(updateQty)


    } catch (error) {
        next(error.message)
    }
}


export const removeCart = async (req, res, next) => {
    try {
        const {id} = req.params;
        console.log(id)
        const cartDelete = await service.deleteCart(id)

        if (cartDelete) {
            res.json(cartDelete)
        } else {
            res.status(404).json({msg: 'Cart not found'})
        }

    } catch (error) {
        next(error.message)
    }
}

export const removeProd = async (req, res, next) => {
    try {
        const {idCart, idProd} = req.params;
        const prodEliminado = await service.removeProd(idCart, idProd)
        res.json(prodEliminado)
    } catch (error) {
        next(error.message)
    }
}
