import * as service from "../services/product.services.js";

export const create = async (req, res, next) => {

    try {
        const newProduct = await service.create(req.body)
        res.status(200).json(newProduct)

    } catch (error) {
        next(error.message);
    }
}

export const addProduct = async (req, res, next) => {
    try {
        const {idCart} = req.params;
        const {idProduct} = req.params;
        const newProdCart = await service.addProduct(idCart, idProduct);
        res.json(newProdCart);

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

export const filtroCategory = async (req, res, next) => {
    try {
        const {Category} = req.query;
        const response = await service.filtroCategory(Category)
        res.json(response)
    } catch (error) {
        next(error.message);
    }
}

export const filtroPriceMaxAMin = async (req, res, next) => {
    try {
        const response = await service.filtroPriceMaxAMin()
        res.json(response)

    } catch (error) {
        next(error.message);
    }
}

export const filtroPriceMinAMax = async (req, res, next) => {
    try {
        const response = await service.filtroPriceMinAMax()
        res.json(response)

    } catch (error) {
        next(error.message);
    }
}

export const getAllPaginate = async (req, res, next) => {
    try {
        const {page, limit} = req.query;
        const response = await service.getAllPaginate(page, limit)
        const next = response.hasNextPage ? `localhost:8080/api/products/all?page=${
            response.nextPage
        }` : null;
        const prev = response.hasPrevPage ? `localhost:8080/api/products/all?page=${
            response.prevPage
        }` : null;


        res.json({
            payload: response.docs,

            info: {
                pageActual: response.page,
                count: response.totalDocs,
                pages: response.totalPages,
                nextPage: response.hasNextPage ? response.hasNextPage : null,
                prevPage: response.hasPrevPage ? response.hasPrevPage : null,
                nextLink: next,
                prevLink: prev
            }

        })
    } catch (error) {
        next(error.message);
    }
}
