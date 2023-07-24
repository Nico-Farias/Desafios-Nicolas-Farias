import ProductDaoMongo from "../daos/mongoDB/product.dao.js";
const prodDao = new ProductDaoMongo();

export const create = async (product) => {
    try {
        const newProduct = await prodDao.create(product);
        return newProduct

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
