import {userModel} from "./models/user.model.js";
import {createHash, isValidPassword} from '../utils.js';


export default class UserDao {

    async createUser(user) {
        try {
            const {email, password} = user;
            const existeUser = await userModel.findOne({email})

            if (! existeUser) {
                const response = await userModel.create({
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
            const userExist = await userModel.findOne({email});
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


    async getAllUser() {
        try {
            const response = await userModel.find({})
            return response
        } catch (error) {
            console.log(error)
        }
    }


    async getUserById(id) {
        try {
            const response = await userModel.findById(id).populate('carts')

            return response
        } catch (error) {
            console.log(error)
        }
    }

    async getByEmail(email) {
        try {
            const userExist = await userModel.findOne({email});

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


    async updateCart(userId, productId, qty) {
        try {


            const response = await userModel.findOneAndUpdate({
                _id: userId,
                "carts._id": productId
            }, {
                $inc: {
                    "carts.$.qty": qty
                }
            }, {new: true});

            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async removeUser(id) {
        try {
            const response = await userModel.findByIdAndDelete(id)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async removeProdInCart(idCart, idProd) {

        try {
            const response = await userModel.findByIdAndUpdate(idCart, {
                $pull: {
                    products: idProd
                }

            }, {new: true});
            return response;
        } catch (error) {
            console.log(error);
        }
    }


}
