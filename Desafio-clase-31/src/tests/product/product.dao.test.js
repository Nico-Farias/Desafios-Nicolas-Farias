import persistence from '../../persistence/daos/persistence.js'
import assert from 'node:assert'
import test from 'node:test'

const {prodDao} = persistence;


test("Deberia mostrar todos los productos de la base de datos", async () => {
    const response = await prodDao.getAll()
    assert.equal(Array.isArray(response), true)

})

test("Deberia crear un producto", async () => {
    const product = {
        name: "Camiseta boca juniors",
        description: "Camiseta de boca juniors temporada 2023",
        category: "Camiseta",
        stock: 10,
        price: 32000,
        imagen: "http://sdfsdf.com/sdfsdf.jpg"
    }

    const response = await prodDao.create(product)

    assert.strictEqual(typeof product.name === "string", true)
    assert.strictEqual(typeof product.description === "string", true)
    assert.strictEqual(typeof product.category === "string", true)
    assert.strictEqual(typeof product.stock === "number", true)
    assert.strictEqual(typeof product.price === "number", true)
    assert.ok(response, "_id")


})

test("Deberia buscar un product por Id", async () => {
    const product = {
        name: "Camiseta boca juniors",
        description: "Camiseta de boca juniors temporada 2023",
        category: "Camiseta",
        stock: 10,
        price: 32000,
        imagen: "http://sdfsdf.com/sdfsdf.jpg"
    }

    const response = await prodDao.create(product)
    const responseId = response._id.toString()
    const NewProd = await prodDao.getById(response._id)
    const NewProductId = NewProd._id.toString()
    assert.equal(NewProductId, responseId)

})
