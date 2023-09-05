import {userModel} from "./models/user.model.js";
import {createHash, isValidPassword} from '../../utils.js';
import MongoDao from "./mongo.dao.js";


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
            console.log(error)
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
            console.log(error);
        }
    };


    async getByEmail(email) {
        try {
            const userExist = await this.model.findOne({email});

            // console.log(userExist);
            if (userExist) 
                return userExist
             else 
                return false


            


        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }


}
