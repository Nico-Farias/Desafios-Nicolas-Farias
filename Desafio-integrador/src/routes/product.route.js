import {Router} from "express";
import {
    getAll,
    getById,
    update,
    create,
    remove
} from '../controllers/product.controllers.js';

const router = Router();


router.get('/', getAll);

router.get('/:id', getById);

router.post('/', create);

router.put('/:id', update);

router.delete('/:id', remove);


export default router;
