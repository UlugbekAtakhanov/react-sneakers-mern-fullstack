const {StatusCodes} = require("http-status-codes")
const Product = require("../models/Product")
const {NotFoundError, BadRequestError} = require("../errors")
const CartForUser = require("../models/Cart/CartForUser")
const CartProduct = require("../models/Cart/CartProduct")
const AttrValue = require("../models/Attributes/AttrValue")



const addProduct = async (req, res) => {
    req.body.image = `http://localhost:5000/server-side/images/${req.file.filename}`
    // const {name, company, price, image, attributes} = req.body

    // const parsedAttr = JSON.parse(attributes)

    // const AttrIdArray = parsedAttr.map( async (itemAttr) => {
    //     // color attr
    //     const colorAttrValue = await AttrValue.findOne({value: itemAttr.color})
    //     let colorAttrValueId = colorAttrValue && colorAttrValue._id
    //     if (!colorAttrValue) {
    //         const createColorAttrValue = await AttrValue.create({name: "color", value: itemAttr.color})
    //         colorAttrValueId = createColorAttrValue._id
    //     }

    //     // size attr
    //     const sizeAttrValue = await AttrValue.findOne({value: itemAttr.size})
    //     let sizeAttrValueId = sizeAttrValue && sizeAttrValue._id
    //     if (!sizeAttrValue) {
    //         const createSizeAttrValue = await AttrValue.create({name: "size", value: itemAttr.size})
    //         sizeAttrValueId = createSizeAttrValue._id
    //     }

    //     if (colorAttrValueId && sizeAttrValueId) {
    //         return {color: colorAttrValueId, size: sizeAttrValueId, qnt: itemAttr.amount}
    //     }
    //     return null
    // })

    // const attrArr = await Promise.all(AttrIdArray)
    const newProduct = await Product.create(req.body)
    res.status(StatusCodes.OK).json(newProduct)
    
    // if (attrArr) {
    //     const productObj = {image, name, company, price, attributes: attrArr}
        

    //     if (newProduct) {
    //         const products = await Product.find({})
    //     }
    // }

}

const getAllProducts = async (req, res) => {
    const {name} = req.query
    let queryObject = {}

    if (name) {
        queryObject.name = {$regex: name, $options: "i"}
    }


    let result = Product.find(queryObject)
    
    // result = result
    const products = await result

    if (!products) {
        throw new NotFoundError("There is no item left..")
    }

    res.status(StatusCodes.OK).json(products)
}


const getSingleProduct = async (req, res) => {
    const id = req.params.id
    const product = await Product.findById(id).populate({path: "attributes"})

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
    addToCart,
    getCart,
    deleteItemFromCart,
}