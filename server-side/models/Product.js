const mongoose = require("mongoose")
const Attribute = require("./Attributes/Attribute")

const productSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: [true, "product name must be provided.."]
    },
    price: {
        type: Number,
        required: [true, "product price must be provided.."]
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum: {
            values: ["ikea", "liddy", "caressa", "marcos"],
            message: `{VALUE} is not supported`
        }
    },
    attributes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Attribute
        }
    ]
})

module.exports = mongoose.model("Product", productSchema)



        // "attributes": ["61b35e5b78426a3d2b18be93", "61b35e5b78426a3d2b18be94"],
        // "attributes": ["61b35e5b78426a3d2b18be93"],
        // "attributes": ["61b35e5b78426a3d2b18be94"],
