const { timeLog } = require('console');
const fs = require('fs');

class ProductManager {

    constructor(path) {
        this.path = path;
    }

    async addProduct(title, description, price, thumbnail, stock = 10) {

        try {
            const producFile = await this.getProducs();

            const produc = {
                id: producFile.length + 1,
                title,
                description,
                price,
                thumbnail,
                code: Date.now() + 2,
                stock
            }
            this.validarCampos(produc)
            producFile.push(produc)

            await fs.promises.writeFile(this.path, JSON.stringify(producFile))

        } catch (error) {
            console.log(error);
        }



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
    }


}

const productManager = new ProductManager('./products.json');


const test = async () => {

    //AGREGAR PRODUCTO
    
        await productManager.addProduct('camiseta', 'Camiseta de argentina', 32000, 'https://www.camiseta.com.br/wp-content/uploads/2020/03/camiseta-de-carne-1.jpg');
        await productManager.addProduct('pantalon de futbol', 'pantalon de futbol', 5000, 'https://www.camiseta.com.br/wp-content/uploads/2020/03/camiseta-de-carne-1.jpg');
        await productManager.addProduct('pantalon trabajo', 'pantalon largo cargo', 10000, 'https://www.camiseta.com.br/wp-content/uploads/2020/03/camiseta-de-carne-1.jpg');
    
    


    //MOSTRAR TODOS LOS PRODUCTOS
    //console.log('DESDE TODOS LOS PRODUCTOS)
    //await productManager.getProducs();


    //BUSCAR POR ID
    //console.log('DESDE BUSCAR POR ID')
    //console.log(await productManager.getProducsById(3));



    //ELIMINAR UN PRODUCTO
    //console.log('DESDE ELIMINAR PRODUCTO)
    //await productManager.getEliminarProducto(2);




    // ACTUALIZAR PRODUCTO
    //console.log('DESDE ACTUALIZAR PRODUCTO)
    // await productManager.updateProducts(4, 'editado ', 'product editado ', 5000, '')


    console.log(await productManager.getProducs());


}

test();







