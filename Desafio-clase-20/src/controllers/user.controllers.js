import * as service from "../services/user.services.js";


export const create = async (req, res, next) => {
    try {
        const user = {
            ...req.body
        }
        const newUser = await service.create(user)
        if (newUser) {
            res.redirect('/login')
        } else {
            res.redirect('/error-register')
        }
    } catch (error) {
        next(error.message)
    }
}


export const login = async (req, res, next) => {
    try {

        const user = await service.loginUser(req.body)

        if (user) {

            req.session.user = user
            res.redirect('/profile');


        } else {
            res.redirect('/error-login');
        }
    } catch (error) {
        next(error.message)
    }
}

export const registerResponse = (req, res, next) => {
    try {
        res.json({msg: 'Register ok', session: req.session});
    } catch (error) {
        next(error.message)
    }
}

export const loginResponse = async (req, res, next) => {
    try {
        const user = await service.getById(req.session.passport.user);
        res.json({msg: 'Login ok', user})
    } catch (error) {
        next(error.message)
    }
}


export const getAllUser = async (req, res, next) => {
    try {
        const allUser = await service.getAllUser()
        res.json(allUser)
    } catch (error) {
        next(error.message)
    }
}


export const getById = async (req, res, next) => {
    try {
        const {id} = req.params

        const userId = await service.getById(id);
        if (! userId) {
            res.status(404).json({msg: 'user not found'})
        } else {
            return res.status(200).json(userId)
        }


    } catch (error) {
        next(error.message)
    }
}

export const getByEmail = async (req, res, next) => {
    try {
        const {email} = req.body

        const userEmail = await service.getByEmail(email);
        if (! userEmail) {
            res.status(404).json({msg: 'user not found'})
        } else {
            return res.status(200).json(userEmail)
        }


    } catch (error) {
        next(error.message)
    }
}


export const updateCart = async (req, res, next) => {
    try {
        const {userId, productId} = req.params;

        const {qty} = req.body;


        const updateQty = await service.updateCart(userId, productId, qty)

        res.status(200).json(updateQty)


    } catch (error) {
        next(error.message)
    }
}


export const removeUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        console.log(id)
        const userDelete = await service.deleteUser(id)

        if (userDelete) {
            res.json(userDelete)
        } else {
            res.status(404).json({msg: 'User not found'})
        }

    } catch (error) {
        next(error.message)
    }
}

export const removeProd = async (req, res, next) => {
    try {
        const {idUser, idProd} = req.params;
        const prodEliminado = await service.removeProd(idUser, idProd)
        res.json(prodEliminado)
    } catch (error) {
        next(error.message)
    }
}


export const googleResponse = async (req, res, next) => {
    try {
        const {nombre, apellido, email, isGoogle} = req.user;


        res.json({
            msg: "Register/Login Google OK",
            session: req.session,
            userData: {
                nombre,
                apellido,
                email,
                isGoogle
            }
        });
    } catch (error) {
        next(error.message);
    }
};
