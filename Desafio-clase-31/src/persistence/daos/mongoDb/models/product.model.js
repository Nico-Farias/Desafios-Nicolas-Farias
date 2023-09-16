import mongoose from 'mongoose'
// import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: false
    },
    price: {
        type: Number,
        required: true
    },

    imagen: {
        type: String,
        required: false
    }

})

// productSchema.plugin(mongoosePaginate)

export const ProductModel = mongoose.model('productos', productSchema)
