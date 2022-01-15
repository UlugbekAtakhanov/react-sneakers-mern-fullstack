const mongoose = require("mongoose")
const AttrValue = require("./Attributes/AttrValue")

const IncomeSchema = new mongoose.Schema({
    productId: String,
    quantity: Number,
    attrValue: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: AttrValue
        }
    ]
}, {timestamps: true})

module.exports = mongoose.model("Income", IncomeSchema)