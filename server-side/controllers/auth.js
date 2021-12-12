const {StatusCodes} = require("http-status-codes")
const User = require("../models/User")
const { BadRequestError, UnauthenticatedError } = require("../errors")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
    const user = await User.create({...req.body})
    const token = jwt.sign({userId: user._id, username: user.username, email: user.email}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
    res.status(StatusCodes.CREATED).json(token)
}

const login = async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        throw new BadRequestError("Please provide email and password..")
    }

    const user = await User.findOne({email})
    if (!user) {
        throw new UnauthenticatedError("Invalid Credentials")
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid Credentials")
    }
    const token = jwt.sign({userId: user._id, username: user.username, email: user.email}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
    res.status(StatusCodes.OK).json({token, user})
}

const getUserInfo = (req, res) => {
    // const {userId, username, email} = req.user
    res.status(StatusCodes.OK).json(req.user)
}


module.exports = {
    register,
    login,
    getUserInfo
}