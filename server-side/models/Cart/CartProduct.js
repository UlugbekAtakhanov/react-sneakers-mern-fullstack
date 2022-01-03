const mongoose = require("mongoose")
const Product = require("../Product")
const AttrValue = require("../Attributes/AttrValue")

const cartSchema = new mongoose.Schema({
    qnt: String,
    totalPrice: String, 
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product
    },
    attributes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: AttrValue
        }
    ]
}, {timestamps: true})

module.exports = mongoose.model("CartProduct", cartSchema)