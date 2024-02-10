import mongoose from "mongoose";
import productModel from "../src/dao/models/products.models.js";
import ProductManager from "../src/dao/db-managers/product.manager.js";
import Assert from "assert"
import { options } from "../src/config/options.js";

mongoose.connect(options.mongoDB.TEST)

const assert = Assert.strict;

describe("Testing para la clase Products dao", () => {
    before(async function () {
        await mongoose.connect(options.mongoDB.TEST)
        this.timeout(5000)
        this.manager = new ProductManager()
    });

    it("Get de Products debe devolver un objeto con los productos de la BD", async function () {
        const result = await this.manager.getProducts();
        console.log(result)
        assert.strictEqual(typeof (result) == "object" ? true : false, true);
    })
});
