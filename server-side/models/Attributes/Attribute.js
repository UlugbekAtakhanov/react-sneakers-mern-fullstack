const mongoose = require("mongoose")
const AttrValue = require("./AttrValue")


const attrSchema = new mongoose.Schema({
    productId: String,
    name: String
    // attributes: [
    //     [
    //         {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: AttrValue
    //         }
    //     ]
    // ]
    
})

module.exports = mongoose.model("Attribute", attrSchema)