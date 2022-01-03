const mongoose = require("mongoose")
const CartProduct = require("./CartProduct")

const cartForUserSchema = new mongoose.Schema({

    owner: String,
    choosedProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: CartProduct
        }
    ]
    
})

module.exports = mongoose.model("CartForUser", cartForUserSchema)