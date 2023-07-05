import express from 'express';
import {__dirname} from './utils.js';
import {Server} from 'socket.io';
import handlebars from 'express-handlebars'
import productRouter from './routes/product.router.js';

import {addProduct, getEliminarProducto, getProducs, getProducsById} from './managers/product.manager.js';

const app = express();


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use('/', productRouter)
app.use('/realtimeproducts', productRouter)


const httpServer = app.listen(4000, () => {
    console.log("listening on")
});

const socketServer = new Server(httpServer);


socketServer.on('connection', async (socket) => {

    console.log('Usuario conectado')


    socket.on('newProduct', async ({title, description, price, thumbnail}) => {
        await addProduct(title, description, price, thumbnail)
        socketServer.emit('Product', await getProducs())
    })

    socket.on('eliminarProduct', async (id) => {

        await getEliminarProducto(id)
        socketServer.emit('Product', await getProducs())

    })

    socketServer.emit('Products', await getProducs())


    socket.on('disconnect', () => {
        console.log('usuario desconectado')
    })


})
