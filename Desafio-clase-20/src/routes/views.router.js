import {Router} from "express";
import {
    login,
    register,
    errorLogin,
    errorRegister,
    profile
} from "../controllers/views.controller.js";

const router = Router();


router.get('/login', login);
router.get('/register', register);
router.get('/error-login', errorLogin);
router.get('/error-register', errorRegister);
router.get('/profile', profile);

export default router;
