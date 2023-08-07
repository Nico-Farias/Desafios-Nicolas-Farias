import {getById} from "../services/user.services.js";

export const register = (req, res) => {
    res.render('register')
};

export const errorRegister = (req, res) => {
    res.render('errorRegister')
};

export const login = (req, res) => {
    res.render('login')
};

export const errorLogin = (req, res) => {
    res.render('errorLogin')
};

export const profile = async (req, res) => {
    const userLogin = req.session.user

    const user = await getById(userLogin)

    console.log(user)

    res.render('profile', {user})


};
