const {StatusCodes} = require("http-status-codes")
const Favorite = require("../models/Favorites")

const getFavorites = async (req, res) => {
    const products = await Favorite.find({choosedBy: req.user.userId})
    res.status(StatusCodes.OK).json(products)
}

const addToFavorites = async (req, res) => {
    req.body.choosedBy = req.user.userId
    const product = await Favorite.create(req.body)
    res.status(StatusCodes.CREATED).json(product)
}

const deleteFavorite = async (req, res) => {
    const {id} = req.params
    const deletedProduct = await Favorite.findByIdAndDelete(id)
    const product = await Favorite.find({choosedBy: req.user.userId})
    res.status(StatusCodes.OK).json(product)
}
 



module.exports = {
    addToFavorites,
    getFavorites,
    deleteFavorite
}