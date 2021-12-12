const express = require("express")
const router = express.Router()

const {register, login, getUserInfo} = require("../controllers/auth")
const authMiddleware = require("../middleware/auth")

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/").get(authMiddleware, getUserInfo)

module.exports = router