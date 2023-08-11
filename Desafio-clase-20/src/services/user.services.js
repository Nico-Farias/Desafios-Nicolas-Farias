import UserDao from '../daos/user.dao.js';

const userDao = new UserDao();

export const create = async (obj) => {
    try {
        const newUser = await userDao.createUser(obj)
        if (! newUser) 
            throw new Error("Validation Error!");
         else 
            return newUser;
        


    } catch (error) {
        console.log(error)
    }
}


export const loginUser = async (user) => {
    try {
        const login = await userDao.login(user)
        return login;
    } catch (error) {
        console.log(error)
    }
}

export const getAllUser = async () => {
    try {
        const allUser = await userDao.getAllCart()
        return allUser;
    } catch (error) {
        console.log(error)
    }
}


export const getById = async (id) => {
    try {
        const UserId = await userDao.getUserById(id)
        return UserId
    } catch (error) {
        console.log(error)
    }
}

export const getByEmail = async (email) => {
    try {
        const response = await userDao.getByEmail(email)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const updateCart = async (UserId, productId, qty) => {
    try {
        const cartUpdate = await userDao.updateCart(UserId, productId, qty)
        return cartUpdate;
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async (id) => {
    try {

        const userDelete = await userDao.removeUser(id)
        return userDelete
    } catch (error) {
        console.log(error)
    }

}

export const removeProd = async (idUser, idProd) => {
    try {
        const prodRemove = await userDao.removeProdInCart(idUser, idProd)

        return prodRemove
    } catch (error) {
        console.log(error)
    }
}
