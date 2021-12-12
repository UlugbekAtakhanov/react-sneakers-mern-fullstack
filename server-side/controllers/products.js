const {StatusCodes} = require("http-status-codes")
const Product = require("../models/Product")
const Cart = require("../models/Cart")
const {NotFoundError, BadRequestError} = require("../errors")

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
    const product = await Product.findById(id).populate({path: "attributes", populate: {path: "value"}})

    res.status(StatusCodes.OK).json(product)
}


//  ADD TO CART

const addToCart = async (req, res) => {
    req.body.choosedBy = req.user.userId
    const product = await Cart.create(req.body)
    if (!product) {
        throw new BadRequestError("sth went wrong..")
    }
    res.status(StatusCodes.CREATED).json(product)   
}

const getCart = async (req, res) => {
    
    const products = await Cart.find({choosedBy: req.user.userId})
    
    if(!products) {
        throw new NotFoundError("There is no item in the cart..")
    }
    res.status(StatusCodes.OK).json(products)
}

const deleteItemFromCart = async (req, res) => {
    const {id} = req.params
    const item = await Cart.findByIdAndDelete(id)
    if (!item) {
        throw new NotFoundError("There is no such item found..")
    }
    const products = await Cart.find({choosedBy: req.user.userId})
    if(!products) {
        throw new NotFoundError("There is no item in the cart..")
    }
    res.status(StatusCodes.OK).json(products)
}




module.exports = {
    getAllProducts,
    getSingleProduct,
    addToCart,
    getCart,
    deleteItemFromCart,
}