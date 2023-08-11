import {Router} from "express";
import {
    create,
    updateCart,
    getById,
    getAllUser,
    removeProd,
    removeUser,
    login,
    registerResponse,
    loginResponse,
    googleResponse

} from "../controllers/user.controllers.js";
import passport from "passport";

const router = Router()

router.post('/create', passport.authenticate('register'), create)
router.post('/login', passport.authenticate('login'), login)
router.get('/users', getAllUser)
router.get('/:id', getById)
router.put('/:userId/:productId', updateCart)
router.delete('/:id', removeUser)
router.delete('/:idCart/product/:idProd', removeProd)

// Autenticar con google

router.get('/oauth2/redirect/accounts.google.com', passport.authenticate('google', {assignProperty: 'user'}), googleResponse)


export default router;
