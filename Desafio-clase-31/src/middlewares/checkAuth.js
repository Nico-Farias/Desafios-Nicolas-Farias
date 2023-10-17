import pkg from 'jsonwebtoken';
import 'dotenv/config';
import persistence from '../persistence/daos/persistence.js';
import {HttpResponse} from '../errors/http.response.js';
import error from '../errors/error.dictionary.js'

const {verify} = pkg;
const {userDao} = persistence;
const httpResponse = new HttpResponse()


const SECRET_KEY = process.env.SECRET_KEY_JWT;

export const checkAuth = async (req, res, next) => {
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

        const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
        const tokenExp = decode.exp; // Tiempo de expiración del token
        const timeUntilExp = tokenExp - now; // Tiempo hasta la expiración en segundos

        if (timeUntilExp <= 300) { // Generar un nuevo token
            const newToken = userDao.generateToken(user, '15m');
            console.log('>>>>>>SE REFRESCÓ EL TOKEN')
            res.set("Authorization", `Bearer ${newToken}`);
        }


        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return httpResponse.Unauhtorized(res, error.UNAUHTORIZED);

    }
};
