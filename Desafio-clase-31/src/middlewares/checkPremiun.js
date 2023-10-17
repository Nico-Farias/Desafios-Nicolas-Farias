import pkg from 'jsonwebtoken'
const {verify} = pkg;
import persistence from '../persistence/daos/persistence.js';
const {userDao} = persistence;
import 'dotenv/config'


const SECRET_KEY = process.env.SECRET_KEY_JWT;

export const checkPremuin = async (req, res, next) => {
    try {
        const authHeader = req.get("Authorization");
        if (! authHeader) {
            return httpResponse.Unauhtorized(res, error.UNAUHTORIZED);

        }

        const token = authHeader.split(" ")[1];
        const decode = verify(token, SECRET_KEY);

        const user = await userDao.getById(decode.userId);
        if (! user) {
            return httpResponse.Unauhtorized(res, error.UNAUHTORIZED);

        }
        const userPrem = user.role;
        if (userPrem !== 'premiun') {
            return httpResponse.Unauhtorized(res, error.UNAUHTORIZED);
        }

        next();
    } catch (error) {

        return httpResponse.Unauhtorized(res, error.UNAUHTORIZED);

    }
};
