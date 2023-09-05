import {Router} from "express";
import ProductControllers from '../controllers/product.controllers.js';
const controllers = new ProductControllers();


const router = Router();


router.get('/', controllers.getAll);
router.get('/prod/:id', controllers.getById);
router.post('/', controllers.create);
router.put('/:id', controllers.update);
router.delete('/:id', controllers.delete);


export default router;
