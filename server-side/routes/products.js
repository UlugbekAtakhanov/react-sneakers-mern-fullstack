const express = require("express")
const multer = require("multer")
const router = express.Router()
const { getAllProducts, addProduct, getSingleProduct, addToCart, getCart, deleteItemFromCart} = require("../controllers/products")
const {addToFavorites, getFavorites, deleteFavorite} = require("../controllers/favorites")
const authMiddleware = require("../middleware/auth")


const fileStorageEngine = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "../server-side/images")
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "--" + file.originalname)
        }
    })
    const upload = multer({storage: fileStorageEngine})


router.route("/products").get(getAllProducts).post(upload.single("image"), addProduct)
router.route("/products/:id").get(getSingleProduct)

router.route("/cart").get(authMiddleware, getCart).post(authMiddleware, addToCart)
router.route("/cart/:id").delete(authMiddleware, deleteItemFromCart)


router.route("/favorites").get(authMiddleware, getFavorites).post(authMiddleware, addToFavorites)
router.route("/favorites/:id").delete(authMiddleware, deleteFavorite)

                           
module.exports = router