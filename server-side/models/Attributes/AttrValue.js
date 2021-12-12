const mongoose = require("mongoose")

const attrValueSchema = new mongoose.Schema({
    name: String,
    value: String
})

module.exports = mongoose.model("AttrValue", attrValueSchema)