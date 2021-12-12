require("dotenv").config()
require("express-async-errors")

const express = require("express")
const app = express()

// connect to database
const connectDB = require("./db/connect")
const url = process.env.MONGO_URI

// packages for security
const cors = require("cors")

// routes
const ProductsRouter = require("./routes/products")
const AuthenticationRouter = require("./routes/auth")

// middlewares
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")
const authMiddleware = require("./middleware/auth")





//middlewares
app.use(express.json())
app.use(cors())

// routes
app.use("/api/v1/", AuthenticationRouter)
app.use("/api/v1/", ProductsRouter)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDB(url)
        app.listen(port, console.log(`Server is listening on port: ${port}..`))
    } catch (error) {
        console.log(error);
    }
}
start()