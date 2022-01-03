const multer = require("multer")

const uploadMiddleware = (req, res, next) => {

    const fileStorageEngine = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "../images")
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "--" + file.originalname)
        }
    })
    const upload = multer({storage: fileStorageEngine})
    next()
    return upload
}

module.exports = uploadMiddleware
