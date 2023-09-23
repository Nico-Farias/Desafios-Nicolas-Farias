import Controllers from "./class.controllers.js";
import UserServices from "../services/user.services.js";
import 'dotenv/config'
import {createResponse, transporter} from "../utils.js";
import {HttpResponse} from "../errors/http.response.js";
import error from '../errors/error.dictionary.js'


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
                httpResponse.NotFound(res, error.USER_ALREDY_REGISTER)
            }

            const gmailOptions = {
                from: process.env.EMAIL,
                to: newUser.email,
                subject: 'Bienvenido/a',
                html: `<h1>Hola ${
                    newUser.nombre
                }, ¡Gracias por registrarte!</h1>`
            };
            const response = await transporter.sendMail(gmailOptions);
            console.log('email enviado!');

            httpResponse.ok(res, {newUser, response})


        } catch (error) {
            next(error.message);
        }
    };

    login = async (req, res, next) => {
        try {
            const token = await userService.login(req.body);
            const {email} = req.body
            const user = await userService.getByEmail(email)

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

    sendEmail = async (req, res) => {
        try {
            const {email, nombre} = req.user;
            const gmailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Bienvenido/a',
                html: `<h1>Hola ${nombre}, ¡Gracias por registrarte!</h1>`
            };
            const response = await transporter.sendMail(gmailOptions);
            console.log('email enviado!');
            res.json(response);
        } catch (error) {
            console.log(error);
        }

    }

    /* profile = (req, res, next) => {
        try {
            const {nombre, apellido, email} = req.user;
            createResponse(res, 200, {nombre, apellido, email});
        } catch (error) {
            next(error.message);
        }
    };
*/

}
