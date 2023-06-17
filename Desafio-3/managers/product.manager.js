
import fs from 'fs'

export default class ProductManager {

    constructor(path) {
        this.path = path;
    }

    async addProduct(title, description, price, thumbnail) {

        try {
            const producFile = await this.getProducs();

            const produc = {
                id: await this.#getIdUnique() + 1 ,
                title,
                description,
                price,
                thumbnail,
                code: Date.now() + 2,
                stock:10
            }
            this.validarCampos(produc)
            producFile.push(produc)

            await fs.promises.writeFile(this.path, JSON.stringify(producFile))
            return produc;

        } catch (error) {
            console.log(error);
        }



    }

    async #getIdUnique(){

        let id = 0;
        const producFile = await this.getProducs();

        producFile.map(produc => {(produc.id > id)
            id = produc.id
        } )
        return id;

    }

    validarCampos(produc) {
        const value = Object.values(produc)

        if (value.includes('') || value.includes(undefined)) {
            console.log(`Por favor llena todos los campos en el PRODUCTO = ${produc.title}, con ID = ${produc.id}`)
            return
        }

    }



    async getProducs() {

        try {
            if (fs.existsSync(this.path)) {
                const producs = await fs.promises.readFile(this.path, 'utf-8');
                const productsJs = JSON.parse(producs)
                return productsJs

            } else {
                return [];
            }

        } catch (error) {
            console.log(error);
        }

    }


    async getProducsById(id) {

        const producFile = await this.getProducs();

        if (producFile.some(produc => produc.id === id)) {
            return producFile.find(produc => produc.id === id);
        } else {
            console.log('Not found , producto no encontrado')
        }

    }

    async getEliminarProducto(id) {

        const producFile = await this.getProducs()

        const producstActualizados = producFile.filter(producto => producto.id !== id)


        await fs.promises.writeFile(this.path, JSON.stringify(producstActualizados))
    }

    async updateProducts(id, title, description, price, thumbnail) {
        
        
        try {
                 const producFile = await this.getProducs();

        if (producFile.some(produc => produc.id === id)) {

            const producActual = producFile.find(produc => produc.id === id);

            producActual.id = id;
            producActual.title = title || producActual.title;
            producActual.description = description || producActual.description;
            producActual.price = price || producActual.price;
            producActual.thumbnail = thumbnail || producActual.thumbnail;
            producActual.code = producActual.code;
            producActual.stock = producActual.stock;


            await fs.promises.writeFile(this.path, JSON.stringify(producFile))

        } else {
            console.log('Not found , producto no encontrado')
        }

        } catch (error) {
            console.log(error)
        }
   
    }


}

