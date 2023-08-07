import {connect} from "mongoose"

export const connectionDB = 'mongodb+srv://root:root@cluster1.jwkc8w3.mongodb.net/Coderhouse'

try {
    await connect(connectionDB)
    console.log('Conectado a la base de datos mongoDB - Coderhouse')
} catch (error) {
    console.log(error)
}
