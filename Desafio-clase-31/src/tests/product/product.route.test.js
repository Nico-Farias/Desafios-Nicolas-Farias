import assert from 'node:assert';
import {describe, test} from 'node:test'

const url = 'http://localhost:8080/api/products'


describe('Test Api Products', () => {


    test('[POST] /api/products', async () => {
        const product = {
            name: "Camiseta boca juniors",
            description: "Camiseta de boca juniors temporada 2023",
            category: "Camiseta",
            stock: 10,
            price: 32000,
            imagen: "http://sdfsdf.com/sdfsdf.jpg"
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)

        })

        const responseAPI = await response.json();
        const productId = responseAPI._id;

        assert.ok(productId, "_id")


    })
    /*
    test('[GET-ALL] /api/products', async () => {
        const response = await request(app).get('/api/products')
        expect(response.body).toBeInstanceOf(Array);

    })
*/
})
