const {StatusCodes} = require("http-status-codes")
const Product = require("../models/Product")
const {NotFoundError, BadRequestError} = require("../errors")
const CartForUser = require("../models/Cart/CartForUser")
const CartProduct = require("../models/Cart/CartProduct")
const AttrValue = require("../models/Attributes/AttrValue")
const Attribute = require("../models/Attributes/Attribute")
const Income = require("../models/Income")


// ADD PRODUCT
const addProduct = async (req, res) => {
    req.body.image = `http://localhost:5000/server-side/images/${req.file.filename}`

    const {name, company, price, image, attributes} = req.body
    const parsedAttr = JSON.parse(attributes)
    const createdProduct = await Product.create({name, company, price, image})

    if (parsedAttr.length > 0) {
        const createAttrPromise = parsedAttr.map(item => {
            return Attribute.create({productId: createdProduct._id, name: item})
        })
        const createdAttr = await Promise.all(createAttrPromise)
        if (createdAttr.length > 0) {
            createdAttr.map(async (item) => {
                await Product.findByIdAndUpdate(createdProduct._id, {$push: {attributes: item._id}})
            })
        }
    }
    const allProducts = await Product.find({})
    res.status(StatusCodes.OK).json(allProducts)
}

// // ADD INCOME TO SPEC PRODUCT
// const addIncome = async (req, res) => {
//     const {productId, quantity, attributes} = req.body
//     if (attributes.length > 0) {
//         const createAttrValue = attributes.map(async (item) => {
//             const attrId = await Attribute.findOne({name: item[0]})
//             return await AttrValue.create({attrId: attrId._id, value: item[1]})
//         })
//         const attrValueArr = await Promise.all(createAttrValue)
//         const income = await Income.create({productId, quantity, attrValue: []})
//         attrValueArr.map(  async (item) => {
//             await  Income.findByIdAndUpdate(income._id, {$push: {attrValue: item._id}}, {new: true})
//         })
//     }
//     const allIncome = await Income.find({productId}).populate({path: "attrValue"})
//     res.status(200).json(allIncome)
// }

// UPDATE SINGLE PRODUCT
const updateSingleProduct = async (req, res) => {
    // const productId = req.params
    // if (req.file && req.file.filename) {
    //     req.body.image = `http://localhost:5000/server-side/images/${req.file.filename}`
    // }
    // const {name, company, price, image, attributes} = req.body

    // const parsedAttr = JSON.parse(attributes)
    // const arrObj = Object.entries(parsedAttr)
    // if (arrObj.length < 1) {
    //     const updatedProduct = await Product.findByIdAndUpdate(productId.id, {name, company, price, image}, {new: true}).populate({path: "attributes"})
    //     return res.status(StatusCodes.OK).json(updatedProduct)
    // }

    // const attrIdArr = arrObj.map(async (obj) => {
    //     const attrValue = await AttrValue.findOne({name: obj[0], value: obj[1]})
    //     let attrValueId = attrValue && attrValue._id
    //     if (!attrValue) {
    //         const createAttrValue = await AttrValue.create({name: obj[0], value: obj[1]})
    //         attrValueId = createAttrValue && createAttrValue._id
    //     }
    //     return attrValueId
    // })
    // const newAttrIdArray = await Promise.all(attrIdArr)
        
    // const checkedByProductId = await Attribute.findOne({productId: productId.id})

    // if (!checkedByProductId) {
    //     const newAttr = await Attribute.create({productId: productId.id, attributes: newAttrIdArray})
    //     if (newAttr) {
    //         return await Product.findByIdAndUpdate(productId.id, {name, company, price, image, $push: {attributes: newAttr._id}}, {new: true})
    //     }
    // }
    // const updatedAttr = await Attribute.findByIdAndUpdate(checkedByProductId._id, {$push: {attributes: newAttrIdArray}}, {new: true})
    // if (updatedAttr) {
    //     const updatedProduct = await Product.findByIdAndUpdate(productId.id, {name, company, price, image}, {new: true}).populate({path: "attributes"})
    //     res.status(StatusCodes.OK).json(updatedProduct)
    // }
    
}
// .populate({path: "attributes", populate: {path: "attributes", model: "AttrValue"}}) IMPORTANT

// GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
    const {name} = req.query
    let queryObject = {}

    if (name) {
        queryObject.name = {$regex: name, $options: "i"}
    }

    let result = Product.find(queryObject)
    
    const products = await result
    if (products.length < 1) {
        throw new NotFoundError("There is no item left..")
    }

    res.status(StatusCodes.OK).json(products)
}


const getSingleProduct = async (req, res) => {
    const id = req.params.id
    const product = await Product.findById(id).populate({path: "attributes"})
    // const attributes = await Income.find({productId: product._id}).populate({path: "attrValue", populate: {path: "attrId", model: "Attribute"}})
    res.status(StatusCodes.OK).json(product)
}


//  ADD TO CART

const addToCart = async (req, res) => {

    let cartForUserInfo = {
        owner: req.user.userId,
        choosedProductId: []
    }

    const userCart = await CartForUser.findOne({owner: req.user.userId})
    
    if (!userCart) {
        const newCartForUser = await CartForUser.create(cartForUserInfo)
        const choosedProduct = req.body
        const pushedToCartProducts = await CartProduct.create(choosedProduct)
        cartForUserInfo.choosedProductId.push(pushedToCartProducts._id)  

        if (newCartForUser) {    
            await CartForUser.findByIdAndUpdate(newCartForUser._id, {$push: {choosedProducts: cartForUserInfo.choosedProductId}})
        }
    }
    
    
    if (userCart) {
        const choosedProduct = req.body
        const pushedToCartProducts = await CartProduct.create(choosedProduct)
        cartForUserInfo.choosedProductId.push(pushedToCartProducts._id)  
        await CartForUser.findByIdAndUpdate(userCart._id, {$push: {choosedProducts: cartForUserInfo.choosedProductId}})
    }

    const products = await CartForUser.findOne({owner: req.user.userId}).populate({path: "choosedProducts", populate: {path: "attributes"}}).populate({path: "choosedProducts", populate: {path: "productId"}})

    res.status(StatusCodes.CREATED).json(products)

    
}

const getCart = async (req, res) => {
    
    const products = await CartForUser.findOne({owner: req.user.userId}).populate({path: "choosedProducts", populate: {path: "attributes"}}).populate({path: "choosedProducts", populate: {path: "productId"}})
    if(!products) {
        throw new NotFoundError("There is no item in the cart..")
    }
    res.status(StatusCodes.OK).json(products)
}

const deleteItemFromCart = async (req, res) => {
    const {id} = req.params
    //deleting from cartProducts
    const deletedFromCartProducts = await CartProduct.findByIdAndDelete(id)

    // deleting from cartForUsers
    const removingElement = await CartForUser.findOneAndUpdate({owner: req.user.userId}, {$pull: {choosedProducts: id}})

    const updatedCartForUser = await CartForUser.findOne({owner: req.user.userId}).populate({path: "choosedProducts", populate: {path: "attributes"}}).populate({path: "choosedProducts", populate: {path: "productId"}})

    // console.log(updatedCartForUser);

    res.status(StatusCodes.OK).json(updatedCartForUser)
}




module.exports = {
    getAllProducts,
    addProduct,
    getSingleProduct,
    updateSingleProduct,
    addToCart,
    getCart,
    deleteItemFromCart,
}