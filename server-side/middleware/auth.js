const { UnauthenticatedError } = require("../errors")
const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader && !authHeader.startsWith("Bearer ")) {
        throw new UnauthenticatedError("Invalid Credentials to access this route..")
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {userId, username, email} = decoded
        req.user = {userId, username, email}
        next()
    } catch (error) {
        throw new UnauthenticatedError("No authorized to access this route")
    }
}


module.exports = authMiddleware