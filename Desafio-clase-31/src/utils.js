import {dirname} from 'path'
import {fileURLToPath} from 'url'
import {createTransport} from "nodemailer";
import 'dotenv/config'

export const __dirname = dirname(fileURLToPath(import.meta.url))

import {hashSync, compareSync, genSaltSync} from 'bcrypt'

/**
 * 
 * @param {*} password 
 * @returns password hasheada
 */
export const createHash = password => hashSync(password, genSaltSync(10))

/**
 * 
 * @param {*} password 
 * @param {*} user 
 * @returns  true o false
 */
export const isValidPassword = (password, user) => compareSync(password, user.password)

export const createResponse = (res, statusCode, data) => {
    return res.status(statusCode).json({data});
};


export const transporter = createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})
