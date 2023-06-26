

import express from 'express'
import ProductManager from './managers/product.manager.js';

const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended:true}))

const productManager = new ProductManager('./product.json')

app.get('/product', async (req, res) => {

    try {
        const products = await productManager.getProducs()
        res.status(200).json(products)
        
    } catch (error) {
        console.log(error)
    }

})

app.get('/product/:idProduct', async (req, res) => {

    try {
        const {idProduct} = req.params;
        const product = await productManager.getProducsById(Number(idProduct))

        if(product){
            res.json(product)
        }else{
            res.status(404).json({message: 'Product not found'})
        }
        
    } catch (error) {
        
        res.status(500).json({message: error.message});
    }

})



app.post('/product' ,async(req, res) => {

    try {
        
        const {title,description,price,thumbnail} = req.body;
     
        const addProduct = await productManager.addProduct(title, description, price, thumbnail)
        res.json(addProduct)

    } catch (error) {
        res.status(500).json({message: error.message});
    }

})

app.put('/product/:idProduct', async (req, res) => {

    try {
        
        const {title,description,price,thumbnail} = req.body;
        const {idProduct} = req.params;

        const existProduct = await productManager.getProducsById(+idProduct)

        if(existProduct){
            await productManager.updateProducts(+idProduct,title,description,price,thumbnail);
            res.json({message : `El producto con id : ${idProduct} se actualizo correctamente`})
        }else{
            res.status(400).json({message : `El producto con id : ${idProduct} no existe`})
        }

    } catch (error) {
          res.status(400).json({message : error.message})
    }

})

app.delete('/product/:idProduct', async(req,res) => {

    try {
        const {idProduct} = req.params;
        const existProduct = await productManager.getProducsById(+idProduct)

        if(existProduct){
            await productManager.getEliminarProducto(+idProduct);
            res.status(200).json({message : `El producto con id : ${idProduct} fue eliminado`})
        }else{
            res.status(400).json({message : `El producto con id : ${idProduct} no existe`})
        }

    } catch (error) {
        res.status(400).json({message : error.message})

    }

})


app.listen(4000, () => {
    console.log("listening on")
});