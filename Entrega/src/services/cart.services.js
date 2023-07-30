import CartDao from "../daos/mongoDB/cart.dao.js";
const cartDao = new CartDao();

export const create = async (obj) => {
    try {
        const newCart = await cartDao.createCart(obj)
        if (! newCart) 
            throw new Error("Validation Error!");
         else 
            return newCart;
        


    } catch (error) {
        console.log(error)
    }
}

export const getAllCart = async () => {
    try {
        const allCarts = await cartDao.getAllCart()
        return allCarts;
    } catch (error) {
        console.log(error)
    }
}


export const getById = async (id) => {
    try {
        const cartId = await cartDao.getCartById(id)
        return cartId
    } catch (error) {
        console.log(error)
    }
}

export const updateCart = async (idCart, idProduct, qty) => {
    try {
        const cartUpdate = await cartDao.updateCart(idCart, idProduct, qty)
        return cartUpdate;
    } catch (error) {
        console.log(error)
    }
}

export const deleteCart = async (id) => {
    try {

        const cartDelete = await cartDao.removeCart(id)
        return cartDelete
    } catch (error) {
        console.log(error)
    }

}

export const removeProd = async (idCart, idProd) => {
    try {
        const prodRemove = await cartDao.removeProdInCart(idCart, idProd)

        return prodRemove
    } catch (error) {
        console.log(error)
    }
}
