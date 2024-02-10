import { Router, json } from "express";
import { getProductsController, getProductbyIdController, createProductController, updateProductController, deleteProductController, deleteProductFormController } from "../controllers/products.controller.js";
import { checkRole } from "../middlewares/roles.js";
import compression from "express-compression";
import { uploaderProduct } from "../config/file-upload.js";

const productRouter = Router();
productRouter.use(json());

productRouter.get("/", compression({ brotli: { enable: true, zlib: {} } }), getProductsController);

productRouter.get("/:pid", getProductbyIdController);

productRouter.post("/", checkRole(["admin", "premium"]), uploaderProduct.single("thumbnail"), createProductController);

productRouter.put("/:pid", checkRole(["admin"]), updateProductController);

productRouter.delete("/:pid", checkRole(["admin", "premium"]), deleteProductController);

productRouter.post("/delete", checkRole(["admin", "premium"]), deleteProductFormController);

export default productRouter;
