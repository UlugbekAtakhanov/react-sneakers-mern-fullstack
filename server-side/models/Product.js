const mongoose = require("mongoose")
const Attribute = require("./Attributes/Attribute")


const productSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    
    attributes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Attribute
        }
    ],




    
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)



