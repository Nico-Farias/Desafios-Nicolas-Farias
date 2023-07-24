import * as service from "../services/product.services.js";

export const create = async (req, res, next) => {

    try {
        const newProduct = await service.create(req.body)
        res.status(200).json(newProduct)

    } catch (error) {
        next(error.message);
    }
}

export const getAll = async (req, res, next) => {

    try {
        const products = await service.getAll()
        res.status(200).json(products)

    } catch (error) {
        next(error.message);
    }
}


export const getById = async (req, res, next) => {

    try {
        const {id} = req.params;
        const productId = await service.getById(id)

        if (! productId) 
            res.status(404).json({msg: 'Product not found'})


        


        res.status(200).json(productId)

    } catch (error) {
        next(error.message);
    }
}


export const update = async (req, res, next) => {

    try {
        const {id} = req.params;
        const productUpdate = await service.update(id, req.body)
        res.status(200).json(productUpdate)

    } catch (error) {
        next(error.message);
    }
}


export const remove = async (req, res, next) => {

    try {
        const {id} = req.params;
        const productDelete = await service.remove(id)
        res.status(200).json(productDelete)

    } catch (error) {
        next(error.message);
    }
}
