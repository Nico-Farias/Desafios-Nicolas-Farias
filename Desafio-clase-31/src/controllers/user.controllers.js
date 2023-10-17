import Controllers from "./class.controllers.js";
import UserServices from "../services/user.services.js";
import {HttpResponse} from "../errors/http.response.js";
import error from '../errors/error.dictionary.js'
import {logguer} from "../utils/logguer.js";
import {sendEmail} from "../utils/email.js";


const userService = new UserServices()
const httpResponse = new HttpResponse()


export default class UserController extends Controllers {
    constructor() {
        super(userService)
    }

    register = async (req, res, next) => {
        try {
            const newUser = await userService.register(req.body);

            if (! newUser) {
                httpResponse.NotFound(res, logguer.error(error.USER_ALREDY_REGISTER))
            }


            await sendEmail(newUser, 'register')
            logguer.info('email enviado!');

            httpResponse.ok(res, newUser)


        } catch (error) {
            next(error.message);
        }
    };


    login = async (req, res, next) => {
        try {
            const token = await userService.login(req.body);
            const {email} = req.body
            const user = await userService.getByEmail(email)

            if (! user) {
                return httpResponse.NotFound(res, logguer.error(error.USER_NOT_FOUND))
            }

            res.header("Authorization", token);
            httpResponse.ok(res, {user, token})


        } catch (error) {
            next(error.message);
        }
    };

    userRepositoryDto = async (req, res, next) => {
        try {
            const {id} = req.params;
            const newUser = await userService.userRepositoryDto(id)
            if (! newUser) {
                httpResponse.NotFound(res, error.USER_NOT_FOUND)
            } else 
                httpResponse.ok(res, newUser)


            


        } catch (error) {
            next(error.message)
        }
    }

    addProdToCart = async (req, res, next) => {
        try {
            const {_id} = req.user;
            const {idProd} = req.params;
            const {qty} = req.params;
            const newProdInCart = await userService.addProdToCard(_id, idProd, Number(qty));
            if (! newProdInCart) 
                httpResponse.NotFound(res, error.ADD_PRODUCT_ERROR);
             else 
                httpResponse.ok(res, newProdInCart);
            


        } catch (error) {
            next(error.message)
        }
    }


    profile = (req, res, next) => {
        try {
            const {nombre, apellido, email} = req.user;
            httpResponse.ok(res, {nombre, apellido, email});
        } catch (error) {
            next(error.message);
        }
    };

    cambiarPassword = async (req, res, next) => {


        try {
            const user = req.user;
            console.log('controller', user)
            const tokenReset = await userService.cambiarPassword(user)
            console.log('tokenReset', tokenReset)

            if (! tokenReset) {
                httpResponse.NotFound(res, 'Not send email')
            }
            res.cookie('tokenreset', tokenReset)

            return httpResponse.ok(res, 'email enviado')

        } catch (error) {
            next(error.message);
        }
    }

    updatePassword = async (req, res, next) => {
        try {
            const user = req.user;
            const {password} = user;
            const {tokenreset} = req.cookies;

            if (!tokenreset) {
                return httpResponse.NotFound(res, 'Token not found')
            }

            const update = await userService.updatePassword(user, password);
            console.log(update)
            if (! update) {
                return httpResponse.NotFound(res, 'Password not found')
            }

            res.clearCookie('tokenreset')

            return httpResponse.ok(res, update)

        } catch (error) {
            logguer.error(error)
        }
    }

}
