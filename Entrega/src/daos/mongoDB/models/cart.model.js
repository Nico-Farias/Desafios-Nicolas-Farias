import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({

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

    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            qty: {
                type: Number,
                default: 0
            },
            default: []
        }
    ]
})

cartSchema.pre('find', function () {
    this.populate('products')
})

export const CartModel = mongoose.model('carts', cartSchema)
