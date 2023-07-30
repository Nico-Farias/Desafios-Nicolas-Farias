import mongoose from 'mongoose';

const connectionDB = 'mongodb+srv://root:root@cluster1.jwkc8w3.mongodb.net/Coderhouse'

try {
    await mongoose.connect(connectionDB)
    console.log('Conectado a la base de datos mongoDB')
} catch (error) {
    console.log(error)
}
