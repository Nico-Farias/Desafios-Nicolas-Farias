import {Router} from "express";
import passport from "passport";
import UserController from '../controllers/user.controllers.js';

const controllers = new UserController()

const router = Router();

router.post('/create', controllers.register);
router.post('/login', controllers.login);
router.get('/', controllers.getAll);
router.get('/id/:id', controllers.getById);
router.put('/:id', controllers.update);
router.delete('/:id', controllers.delete);
// router.get('/profile', controllers.profile)


// Autenticar con google

// router.get('/oauth2/redirect/accounts.google.com', passport.authenticate('google', {assignProperty: 'user'}), controllers.profile);


export default router;
