import ProductDaoMongo from "../daos/product.dao.js";
const prodDao = new ProductDaoMongo();

export const create = async (product) => {
    try {
        const newProduct = await prodDao.create(product);
        return newProduct

    } catch (error) {
        console.log(error)
    }
}

export const addProduct = async (idUser, idProduct) => {
    try {

        const addProd = await prodDao.addProduct(idUser, idProduct)

        return addProd

    } catch (error) {
        console.log(error)
    }
}


export const getAll = async () => {
    try {
        const response = await prodDao.getAll();
        return response;
    } catch (error) {
        console.log(error)
    }
}


export const getById = async (id) => {
    try {
        const productId = await prodDao.getById(id);
        if (! productId) 
            return false;
         else 
            return productId;
        


    } catch (error) {
        console.log(error)
    }
}


export const update = async (id, product) => {
    try {
        const productUpd = await prodDao.update(id, product);
        return productUpd;
    } catch (error) {
        console.log(error)
    }
}


export const remove = async (id) => {
    try {
        const productEliminado = await prodDao.remove(id);
        return productEliminado;
    } catch (error) {
        console.log(error)
    }
}

export const filtroCategory = async (Category) => {
    try {
        const filtro = await prodDao.filtroCategory(Category)
        return filtro
    } catch (error) {
        console.log(error)
    }
}

export const filtroPriceMaxAMin = async () => {
    try {
        const filtro = await prodDao.filtroPriceMaxAMin()
        return filtro
    } catch (error) {
        console.log(error)
    }
}

export const filtroPriceMinAMax = async () => {
    try {
        const filtro = await prodDao.filtroPriceMinAMax()
        return filtro
    } catch (error) {
        console.log(error)
    }
}

export const getAllPaginate = async (page, limit) => {
    try {
        const response = await prodDao.getAllPaginate(page, limit)
        return response
    } catch (error) {
        console.log(error)
    }
}
