import Services from "./class.services.js";
import pkg from 'jsonwebtoken'
const {sign} = pkg
import 'dotenv/config'
import persistence from "../persistence/daos/persistence.js";
import UserRepository from "../persistence/repository/users/user.repository.js";
import {logguer} from "../utils/logguer.js";
import {sendEmail} from "../utils/email.js";

const userRepository = new UserRepository()

const {userDao, prodDao} = persistence;


const SECRET_KEY = process.env.SECRET_KEY_JWT

export default class UserServices extends Services {
    constructor() {
        super(userDao)
    }

    #generateToken(user) {
        const payload = {
            userId: user.id,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            carts: user.carts
        };
        return sign(payload, SECRET_KEY, {expiresIn: '10m'});
    };

    async register(user) {
        try {
            return await userDao.register(user)
        } catch (error) {
            logguer.error(error);

        }

    }


    async login(user) {
        try {
            const userExist = await userDao.login(user)
            if (userExist) 
                return this.#generateToken(userExist)
             else 
                return false;
            


        } catch (error) {
            logguer.error(error);

        }
    }

    async getByEmail(email) {
        try {
            return await userDao.getByEmail(email)
        } catch (error) {
            logguer.error(error);

        }
    }

    async userRepositoryDto(id) {
        try {
            const newUser = await userRepository.userRepositoryDto(id)
            if (! newUser) 
                return false;
             else 
                return newUser;
            


        } catch (error) {
            logguer.error(error);

        }
    }
    async addProdToCard(idUser, idProd, qty) {
        try {
            const existProd = await prodDao.getById(idProd);
            if (! existProd) 
                return false;
            


            const response = await userDao.addProdToCart(idUser, idProd, qty);
            return response;
        } catch (error) {
            logguer.error(error);

        }
    }

    async cambiarPassword(user) {
        try {
            const token = await userDao.cambiarPassword(user)
            if (! token) 
                return false;
            


            return await sendEmail(user, 'resetPass', token)


        } catch (error) {
            logguer.error(error);
        }
    }

    async updatePassword(user, password) {
        try {
            return await userDao.updatePassword(user, password)
        } catch (error) {
            logguer.error(error);
        }
    }

}
