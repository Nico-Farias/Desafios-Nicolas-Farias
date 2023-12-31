import Controllers from "./class.controllers.js";
import UserServices from "../services/user.services.js";
import {createResponse} from "../utils.js";
const userService = new UserServices()


export default class UserController extends Controllers {
    constructor() {
        super(userService)
    }

    register = async (req, res, next) => {
        try {
            const newUser = await userService.register(req.body);
            if (! newUser) {

                createResponse(res, 404, {msg: "User already registered"})
            } else 
                createResponse(res, 200, newUser)


            


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
            createResponse(res, 200, {
                msg: "Login Ok",
                user,
                token
            })


        } catch (error) {
            next(error.message);
        }
    };

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
