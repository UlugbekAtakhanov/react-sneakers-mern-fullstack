require("dotenv").config()
const Attribute = require("./models/Attributes/Attribute")
const jsonAttribute = require("./populateAttr.json")
const connectDB = require("./db/connect")
const url = process.env.MONGO_URI

const start = async () => {
    try {
        await connectDB(url)
        await Attribute.deleteMany()
        await Attribute.create(jsonAttribute)
        console.log("Connected and the data have been sended to DB...");
        console.log("Proccess is finished..");
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start()