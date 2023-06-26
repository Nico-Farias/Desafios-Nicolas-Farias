import {Router} from "express";
const router = Router();
import {
    getProducs,
    getEliminarProducto,
    getProducsById,
    addProduct,
    updateProducts
} from "../managers/product.manager.js";


router.get('/', async (req, res) => {

    try {
        const products = await getProducs()
        res.status(200).json(products)

    } catch (error) {
        console.log(error)
    }

})

router.get('/:idProduct', async (req, res) => {

    try {
        const {idProduct} = req.params;
        const product = await getProducsById(Number(idProduct))

        if (product) {
            res.json(product)
        } else {
            res.status(404).json({message: 'Product not found'})
        }

    } catch (error) {

        res.status(500).json({message: error.message});
    }

})


router.post('/', async (req, res) => {

    try {

        const {title, description, price, thumbnail} = req.body;

        const addProducts = await addProduct(title, description, price, thumbnail)
        res.json(addProducts)

    } catch (error) {
        res.status(500).json({message: error.message});
    }

})

router.put('/:idProduct', async (req, res) => {

    try {

        const {title, description, price, thumbnail} = req.body;
        const {idProduct} = req.params;

        const existProduct = await getProducsById(+ idProduct)

        if (existProduct) {
            await updateProducts(+ idProduct, title, description, price, thumbnail);
            res.json({message: `El producto con id : ${idProduct} se actualizo correctamente`})
        } else {
            res.status(400).json({message: `El producto con id : ${idProduct} no existe`})
        }

    } catch (error) {
        res.status(400).json({message: error.message})
    }

})

router.delete('/:idProduct', async (req, res) => {

    try {
        const {idProduct} = req.params;
        const existProduct = await getProducsById(+ idProduct)

        if (existProduct) {
            await getEliminarProducto(+ idProduct);
            res.status(200).json({message: `El producto con id : ${idProduct} fue eliminado`})
        } else {
            res.status(400).json({message: `El producto con id : ${idProduct} no existe`})
        }

    } catch (error) {
        res.status(400).json({message: error.message})

    }

})

export default router;
