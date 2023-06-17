
class ProductManager {

    constructor() {
        this.producs = [];
    }

    addProduct(title, description, price, thumbnail, stock = 10) {

        const produc = {
            id: this.producs.length + 1,
            title,
            description,
            price,
            thumbnail,
            code: this.#getCodeUnique(),
            stock
        }

        this.validarCampos(produc)



    }

    validarCampos(produc) {
        const value = Object.values(produc)

        if (value.includes('') || value.includes(undefined)) {
            console.log(`Por favor llena todos los campos en el PRODUCTO = ${produc.title}, con ID = ${produc.id}`)
            return
        } else {
            this.producs.push(produc);
        }

    }

    #getCodeUnique() {
        let code = Date.now();

        while (this.producs.find(produc => produc.code === code)) {
            code++;
        }
        return code;
    }

    getProducs() {
        return this.producs;
    }

    getProducsById(id) {

        if (this.producs.some(produc => produc.id === id)) {
            return this.producs.find(produc => produc.id === id);

        } else {
            console.log('Not found , producto no encontrado')
        }



    }

}

const productManager = new ProductManager();

productManager.addProduct('camiseta', 'Camiseta de argentina', 32000, 'https://www.camiseta.com.br/wp-content/uploads/2020/03/camiseta-de-carne-1.jpg');
productManager.addProduct('pantalon de futbol', 'pantalon de futbol', 5000, 'https://www.camiseta.com.br/wp-content/uploads/2020/03/camiseta-de-carne-1.jpg');
productManager.addProduct('pantalon trabajo', 'pantalon largo cargo', 10000, 'https://www.camiseta.com.br/wp-content/uploads/2020/03/camiseta-de-carne-1.jpg');


console.log('--- Todos los productos ---')
console.log(productManager.getProducs())
console.log('---- Producto por Id ----')
console.log(productManager.getProducsById(1))