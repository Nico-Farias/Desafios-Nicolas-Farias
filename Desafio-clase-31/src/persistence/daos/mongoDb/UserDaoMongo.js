import {userModel} from "./models/user.model.js";
import jwt from "jsonwebtoken";
import {createHash, isValidPassword} from '../../../utils.js';
import MongoDao from "./mongo.dao.js";
import {logguer} from "../../../utils/logguer.js";
import {HttpResponse} from '../../../errors/http.response.js';


export default class UserDaoMongo extends MongoDao {
    constructor() {
        super(userModel);
    }

    generateToken(user, timeExp) {
        const payload = {
            userId: user._id
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, {expiresIn: timeExp})

        return token;
    }
    async register(user) {
        try {
            const {email, password} = user;
            const existeUser = await this.getByEmail(email);

            if (!existeUser) {
                const response = await this.model.create({
                    ...user,
                    password: createHash(password)
                });
                return response;
            } else {
                return false;
            }

        } catch (error) {
            logguer.error(error);
        }
    }


    async login(user) {
        try {
            const {email, password} = user;
            const userExist = await this.getByEmail(email);
            if (userExist) {
                const validPassword = isValidPassword(password, userExist);

                if (! validPassword) 
                    return console.log("Invalid password")
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
                return userExist;
             else 
                return false;
            


        } catch (error) {
            logguer.error(error);
            throw new Error(error);
        }
    }

    async addProdToCart(idUser, idProd, qty) {
        try {
            const user = await userModel.findById(idUser);
            if (! user) 
                return false;
             else 
                user.carts.push({_id: idProd, qty});
             user.save();
            return user;

        } catch (error) {
            logguer.error(error);
        }
    }

    async cambiarPassword(user) {

        try {
            const {email} = user;
            const existUser = await this.getByEmail(email);

            if (! existUser) {
                return false
            }

            return this.generateToken(existUser, '1h')
        } catch (error) {
            logguer.error(error)
        }

    }

    async updatePassword(user, password) {
        try {
            const equal = isValidPassword(password, user)

            if (equal) {
                return false
            } else {
                const newPassword = createHash(password)
                return await this.update(user._id, {password: newPassword})
            }


        } catch (error) {
            logguer.error(error)
        }
    }

}
