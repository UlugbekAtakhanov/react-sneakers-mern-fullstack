const mongoose = require("mongoose")

const favoriteSchema = new mongoose.Schema({
    product: {
        type: Object,
        required: true 
    },
    choosedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"]
    }
}, {timestamps: true})

module.exports = mongoose.model("Favorite", favoriteSchema)