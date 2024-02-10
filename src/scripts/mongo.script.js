import mongoose from "mongoose";
import productModel from "../dao/models/products.models.js";
import { options } from "../config/options.js";

function ConnectDB() {
    mongoose.connect(options.mongoDB.URL).then((conn) => { console.log("Connected to DB!!!") })
}
ConnectDB()

const updateProducts = async () => {
    try {
        const adminID = "6474f60be5dafa95add7820f";
        const result = await productModel.updateMany({}, { $set: { owner: adminID } });
        console.log("result", result)
    } catch (error) {
        console.log(error.message)
    }
}
updateProducts()