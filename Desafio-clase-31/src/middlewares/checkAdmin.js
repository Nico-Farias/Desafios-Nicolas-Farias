import pkg from 'jsonwebtoken'
const {verify} = pkg;
import persistence from '../persistence/daos/persistence.js';
const {userDao} = persistence;
import 'dotenv/config'
import {createResponse} from '../utils.js';

const SECRET_KEY = process.env.SECRET_KEY_JWT;

export const checkAdmin = async (req, res, next) => {
    try {
        const authHeader = req.get("Authorization");
        if (! authHeader) {
            return res.status(401).json({msg: "Unauthorized"});
        }

        const token = authHeader.split(" ")[1];
        const decode = verify(token, SECRET_KEY);

        const user = await userDao.getById(decode.userId);
        if (! user) {
            return res.status(400).json({msg: "Unauthorized"});
        }
        const userAdmin = user.admin;
        if (userAdmin !== true) {
            return createResponse(res, 404, {msg: "User not admin"})
        }

        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({msg: "Unauthorized"});
    }
};
