import {Router} from "express";
import {
    getAll,
    getById,
    update,
    create,
    remove,
    addProduct,
    filtroCategory,
    filtroPriceMaxAMin,
    filtroPriceMinAMax,
    getAllPaginate
} from '../controllers/product.controllers.js';


const router = Router();


router.get('/', getAll);
router.get('/all', getAllPaginate);


router.get('/id/:id', getById);

router.post('/', create);

router.post('/:idCart/add/:idProduct', addProduct)

router.put('/:id', update);

router.delete('/:id', remove);

router.get('/category', filtroCategory)

router.get('/filtrarMaxAMin', filtroPriceMaxAMin)
router.get('/filtrarMinAMAX', filtroPriceMinAMax)


export default router;
