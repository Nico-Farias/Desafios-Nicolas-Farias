import {Router} from "express";
import ProductControllers from '../controllers/product.controllers.js';
import {checkAdmin} from '../middlewares/checkAdmin.js';
const controllers = new ProductControllers();


const router = Router();


router.get('/', controllers.getAll);
router.get('/prod/:id', controllers.getById);
router.post('/', checkAdmin, controllers.create);
router.put('/:id', checkAdmin, controllers.update);
router.delete('/:id', checkAdmin, controllers.delete);


export default router;
