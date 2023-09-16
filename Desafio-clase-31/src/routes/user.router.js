import {Router} from "express";
import passport from "passport";
import UserController from '../controllers/user.controllers.js';
import {checkAuth} from '../middlewares/checkAuth.js';

const controllers = new UserController()

const router = Router();

router.post('/create', controllers.register);
router.post('/login', controllers.login);
router.get('/users', controllers.getAll);
router.get('/id/:id', controllers.getById);
router.get('/dto/user/:id', controllers.userRepositoryDto)
router.put('/:id', controllers.update);
router.delete('/:id', controllers.delete);
router.post('/add/:idProd/qty/:qty', checkAuth, controllers.addProdToCart)


// Autenticar con google

// router.get('/oauth2/redirect/accounts.google.com', passport.authenticate('google', {assignProperty: 'user'}), controllers.profile);


export default router;
