import express from 'express';
import {errorHandler} from './middlewares/errorHandler.js'
import morgan from 'morgan'
import productRoute from './routes/product.route.js'
import './daos/mongoDB/connection.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(errorHandler)
app.use(morgan('dev'))

app.use('/api/products', productRoute)

app.listen(8080, () => {
    console.log('🚀 Server corriendo en puerto 8080')

})
