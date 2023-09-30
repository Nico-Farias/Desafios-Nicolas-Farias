import {connect} from "mongoose"
import {logguer} from "../../../utils/logguer.js"

export const connectionDB = 'mongodb+srv://root:root@cluster1.jwkc8w3.mongodb.net/Coderhouse'

export const initMongoDB = async () => {
    try {
        await connect(connectionDB)
        logguer.http('Conectado a la base de datos mongoDB - Coderhouse')
    } catch (error) {
        logguer.error(error)
    }
}
