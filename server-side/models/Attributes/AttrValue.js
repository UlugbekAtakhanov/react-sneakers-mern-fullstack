const mongoose = require("mongoose")
const Attribute = require("./Attribute")

const attrValueSchema = new mongoose.Schema({
    attrId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attribute"
    },
    value: String
})

module.exports = mongoose.model("AttrValue", attrValueSchema)