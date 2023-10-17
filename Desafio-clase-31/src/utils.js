import {dirname} from 'path'
import {fileURLToPath} from 'url'

import 'dotenv/config'
import {faker} from '@faker-js/faker';


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


export const productFaker = () => {

    const min = 1; // Valor mínimo del precio
    const max = 1000; // Valor máximo del precio
    const dec = 2; // Precisión de dos decimales
    const symbol = '$'

    return {
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        category: faker.commerce.department(),
        stock: Math.floor(Math.random() * 101),

        price: parseFloat(
            (Math.random() * 1000).toFixed(2)
        ), // Usamos parseFloat para convertir el precio a un número decimal

        imageUrl: 'https://example.com/product-image.jpg'


    }
}
