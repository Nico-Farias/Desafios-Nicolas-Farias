import express from 'express'
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';

const app = express();


app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)


app.listen(4000, () => {
    console.log("listening on")
});
