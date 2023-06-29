import fs from 'fs'
import {__dirname} from '../utils.js'
import {getProducsById} from './product.manager.js'
const pathFileCart = __dirname + '/db/carts.json'


export const createCart = async () => {

    try {
        const cartFile = await getCarts()

        const cart = {
            id: (await getIdUnique()) + 1,
            product: []

        }

        cartFile.push(cart)

        await fs.promises.writeFile(pathFileCart, JSON.stringify(cartFile))
        return cart;


    } catch (error) {
        console.log(error)
    }

}

const getIdUnique = async () => {

    let id = 0;
    const cartFile = await getCarts();

    cartFile.map(cart => {
        (cart.id > id)
        id = cart.id
    })
    return id;

}

export const addProductToCart = async (idCart, idProduct) => {
    try {
        const cartFile = await getCarts();
        const existCart = await getCartById(+ idCart);
        const existeProduct = await getProducsById(+ idProduct);

        if (existCart && existeProduct) {
            const existProductCart = existCart.product.find((prod) => prod.id === idProduct);

            if (! existProductCart) {
                const prod = {
                    id: idProduct,
                    qty: 1
                };
                existCart.product.push(prod);
            } else {
                existProductCart.qty += 1;
            }

            // Actualizar el carrito en el arreglo de carritos
            const updatedCartFile = cartFile.map((cart) => {
                if (cart.id === idCart) {
                    return existCart;
                }
                return cart;
            });

            // Sobrescribir el archivo con los datos actualizados
            await fs.promises.writeFile(pathFileCart, JSON.stringify(updatedCartFile));

            console.log(updatedCartFile);
            console.log(existCart);

            return updatedCartFile;
        } else {
            console.log('Not found');
        }
    } catch (error) {
        console.log(error);
    }
};


export const getCarts = async () => {

    try {

        if (fs.existsSync(pathFileCart)) {
            const carts = await fs.promises.readFile(pathFileCart, 'utf8');
            const cartsJs = JSON.parse(carts)
            return cartsJs;
        } else {
            return []
        }


    } catch (error) {
        console.log(error)
    }

}

export const removeCartById = async (id) => {

    const cart = await getCarts()

    const cartActualizados = cart.filter(cart => cart.id !== id)


    await fs.promises.writeFile(pathFileCart, JSON.stringify(cartActualizados))


}

export const getCartById = async (id) => {

    const carts = await getCarts()

    if (carts.some(cart => cart.id === id)) {
        const cartId = carts.find(cart => cart.id === id)
        return cartId;
    } else {
        console.log('Cart not found')
    }

}
