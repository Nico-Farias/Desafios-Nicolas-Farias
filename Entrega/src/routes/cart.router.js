import {Router} from "express";
import {
    create,
    updateCart,
    getById,
    getAllCart,
    removeCart,
    removeProd

} from "../controllers/cart.controllers.js";

const router = Router()

router.post('/', create)
router.get('/carts', getAllCart)
router.get('/:id', getById)
router.put('/:cartId/:productId', updateCart)
router.delete('/:id', removeCart)
router.delete('/:idCart/product/:idProd', removeProd)


export default router;
