const express = require("express")
const router = express.Router()
const { getAllProducts, getSingleProduct, addToCart, getCart, deleteItemFromCart} = require("../controllers/products")
const {addToFavorites, getFavorites, deleteFavorite} = require("../controllers/favorites")
const authMiddleware = require("../middleware/auth")


router.route("/products").get(authMiddleware, getAllProducts)
router.route("/products/:id").get(getSingleProduct)

router.route("/cart").get(authMiddleware, getCart).post(authMiddleware, addToCart)
router.route("/cart/:id").delete(authMiddleware, deleteItemFromCart)


router.route("/favorites").get(authMiddleware, getFavorites).post(authMiddleware, addToFavorites)
router.route("/favorites/:id").delete(authMiddleware, deleteFavorite)


module.exports = router