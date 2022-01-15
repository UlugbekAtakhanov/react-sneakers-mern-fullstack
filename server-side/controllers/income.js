const AttrValue = require("../models/Attributes/AttrValue")
const Attribute = require("../models/Attributes/Attribute")
const Income = require("../models/Income")
const Product = require("../models/Product")


// ADD INCOME TO SPEC PRODUCT
const addIncome = async (req, res) => {
    const {productId, quantity, attributes} = req.body
    if (attributes.length > 0) {
        const createAttrValue = attributes.map(async (item) => {
            const attrId = await Attribute.findOne({name: item[0]})
            return await AttrValue.create({attrId: attrId._id, value: item[1]})
        })
        const attrValueArr = await Promise.all(createAttrValue)
        const income = await Income.create({productId, quantity, attrValue: []})
        attrValueArr.map(  async (item) => {
            await  Income.findByIdAndUpdate(income._id, {$push: {attrValue: item._id}}, {new: true})
        })
    }
    const allIncome = await Income.find({productId}).populate({path: "attrValue", populate: {path: "attrId"}})
    res.status(200).json(allIncome)
}

const getIncome = async (req, res) => {
    const productId = req.params
    const product = await Product.findById(productId.id).populate({path: "attributes"})
    const attrValueArr = await Income.find({productId: productId.id}).populate({path: "attrValue", populate: {path: "attrId"}}).populate({path: "productId", model: "Product"})
    res.status(200).json({product, attrValueArr})
}

module.exports = {
    addIncome,
    getIncome
}