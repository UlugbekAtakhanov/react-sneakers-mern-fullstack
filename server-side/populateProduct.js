require("dotenv").config()
const Product = require("./models/Product")
const jsonProduct = require("./products.json")
const connectDB = require("./db/connect")
const url = process.env.MONGO_URI

const start = async () => {
    try {
        await connectDB(url)
        await Product.deleteMany()
        await Product.create(jsonProduct)
        console.log("Connected and the data have been sended to DB...");
        console.log("Proccess is finished..");
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start()