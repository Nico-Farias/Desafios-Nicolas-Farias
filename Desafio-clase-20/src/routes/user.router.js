import {Router} from "express";
import {
    create,
    updateCart,
    getById,
    getAllUser,
    removeProd,
    removeUser,
    login

} from "../controllers/user.controllers.js";

const router = Router()

router.post('/create', create)
router.post('/login', login)
router.get('/users', getAllUser)
router.get('/:id', getById)
router.put('/:userId/:productId', updateCart)
router.delete('/:id', removeUser)
router.delete('/:idCart/product/:idProd', removeProd)


export default router;
