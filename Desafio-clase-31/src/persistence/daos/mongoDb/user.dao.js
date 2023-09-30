import {userModel} from "./models/user.model.js";
import {createHash, isValidPassword} from '../../../utils.js';
import MongoDao from "./mongo.dao.js";
import {logguer} from "../../../utils/logguer.js";


export default class UserDaoMongo extends MongoDao {
    constructor() {
        super(userModel)
    }

    async register(user) {
        try {
            const {email, password} = user;
            const existeUser = await this.getByEmail(email)

            if (! existeUser) {
                const response = await this.model.create({
                    ...user,
                    password: createHash(password)
                })
                return response
            } else {
                return false;
            }

        } catch (error) {
            logguer.error(error)
        }
    }


    async login(user) {
        try {
            const {email, password} = user;
            const userExist = await this.getByEmail(email);
            if (userExist) {
                const validPassword = isValidPassword(password, userExist);

                if (! validPassword) 
                    return false;
                 else 
                    return userExist;
                


            } else 
                return false;
            


        } catch (error) {
            logguer.error(error);
        }
    };


    async getByEmail(email) {
        try {
            const userExist = await this.model.findOne({email});


            if (userExist) 
                return userExist
             else 
                return false


            


        } catch (error) {
            logguer.error(error)
            throw new Error(error)
        }
    }

    async addProdToCart(idUser, idProd, qty) {
        try {
            const user = await userModel.findById(idUser)
            if (! user) 
                return false;
             else 
                user.carts.push({_id: idProd, qty})


             user.save()
            return user

        } catch (error) {
            logguer.error(error)
        }
    }

}
