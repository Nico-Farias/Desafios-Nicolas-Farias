import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        index: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        default: ''
    },
    isGoogle: {
        type: Boolean,
        required: true,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    },


    carts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'productos',
            default: []
        }
    ]
})


export const userModel = mongoose.model('user', userSchema)
