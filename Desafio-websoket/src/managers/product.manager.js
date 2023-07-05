import fs from 'fs'
import {__dirname} from '../utils.js';
const pathFile = __dirname + '/db/product.json'


export const addProduct = async (title, description, price, thumbnail) => {

    try {
        const producFile = await getProducs();

        const produc = {
            id: await getIdUnique() + 1,
            title,
            description,
            price,
            thumbnail,
            qty: 1,
            code: Date.now() + 2,
            stock: 10
        }
        validarCampos(produc)
        producFile.push(produc)

        await fs.promises.writeFile(pathFile, JSON.stringify(producFile))
        return produc;

    } catch (error) {
        console.log(error);
    }


}

const getIdUnique = async () => {

    let id = 0;
    const producFile = await getProducs();

    producFile.map(produc => {
        (produc.id > id)
        id = produc.id
    })
    return id;

}

const validarCampos = (produc) => {
    const value = Object.values(produc)

    if (value.includes('') || value.includes(undefined)) {
        console.log(`Por favor llena todos los campos en el PRODUCTO = ${
            produc.title
        }, con ID = ${
            produc.id
        }`)
        return
    }

}


export const getProducs = async () => {

    try {
        if (fs.existsSync(pathFile)) {
            const producs = await fs.promises.readFile(pathFile, 'utf-8');
            const productsJs = JSON.parse(producs)
            return productsJs

        } else {
            return [];
        }

    } catch (error) {
        console.log(error);
    }

}


export const getProducsById = async (id) => {

    const producFile = await getProducs();

    if (producFile.some(produc => produc.id === id)) {
        return producFile.find(produc => produc.id === id);
    } else {
        console.log('Not found , producto no encontrado')
    }

}

export const getEliminarProducto = async (id) => {

    const producFile = await getProducs()

    const producstActualizados = producFile.filter(producto => producto.id !== id)


    await fs.promises.writeFile(pathFile, JSON.stringify(producstActualizados))
}

export const updateProducts = async (id, title, description, price, thumbnail) => {


    try {
        const producFile = await getProducs();

        if (producFile.some(produc => produc.id === id)) {

            const producActual = producFile.find(produc => produc.id === id);

            producActual.id = id;
            producActual.title = title || producActual.title;
            producActual.description = description || producActual.description;
            producActual.price = price || producActual.price;
            producActual.thumbnail = thumbnail || producActual.thumbnail;
            producActual.code = producActual.code;
            producActual.qty = qty || producActual.qty;
            producActual.stock = producActual.stock;


            await fs.promises.writeFile(pathFile, JSON.stringify(producFile))

        } else {
            console.log('Not found , producto no encontrado')
        }

    } catch (error) {
        console.log(error)
    }

}
