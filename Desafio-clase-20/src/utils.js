import {dirname} from 'path'
import {fileURLToPath} from 'url'
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
