import {Router} from "express";
import {
    getCartById,
    getCarts,
    createCart,
    addProductToCart,
    removeCartById
} from "../managers/cart.manager.js";
import {getProducsById} from "../managers/product.manager.js";

const router = Router();

router.post('/', async (req, res) => {

    try {
        const cart = await createCart()
        res.json(cart)

    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/', async (req, res) => {

    try {
        const cart = await getCarts()
        res.status(200).json(cart)
    } catch (error) {
        console.log(error)
    }
})

router.post('/:idCart/:idProduct', async (req, res) => {

    try {

        const {idCart, idProduct} = req.params;
        const existCart = await getCartById(+ idCart)

        if (existCart) {

            await addProductToCart(+ idCart, + idProduct)

            res.json(existCart)


        } else {
            res.status(404).json({msg: `El producto ${idProduct} o el carrito ${idCart}  no existe`})
        }


    } catch (error) {
        console.log(error)
    }

})

router.get('/:idCart', async (req, res) => {

    try {
        const {idCart} = req.params;
        const cart = await getCartById(+ idCart)
        res.json(cart)

    } catch (error) {
        console.log(error)
    }
})

router.delete('/:idCart', async (req, res) => {

    try {
        const {idCart} = req.params;
        const existCart = await getCartById(+ idCart)

        if (existCart) {
            await removeCartById(+ idCart)
            res.status(200).json({msg: `El producto con el id ${idCart} fue eliminado`})
        } else {
            res.status(404).json({msg: `El producto con el id ${idCart} no existe`})
        }


    } catch (error) {
        console.log(error)
    }
})


export default router;
