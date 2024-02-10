import { Router, json } from "express";
import { getCartController, createCartController, getCartByIdController, AddProducttoCartController, DeleteProductFromCartController, DeleteCartController, GetProductsinCart, notCartController, PurchaseCartController, ClearCartController } from "../controllers/cart.controller.js";
import { checkRole } from "../middlewares/roles.js";

const cartRouter = Router();
cartRouter.use(json());

cartRouter.get("/", getCartController);

cartRouter.post("/", createCartController);

cartRouter.get("/:cid", getCartByIdController);

cartRouter.post("/:cid/product/:pid", checkRole(["user", "premium"]), AddProducttoCartController);

cartRouter.post("/error", notCartController);

cartRouter.delete("/:cid/product/:pid", DeleteProductFromCartController);

cartRouter.post("/:cid/delete/:pid", DeleteProductFromCartController);

cartRouter.delete("/:cid", DeleteCartController)

cartRouter.get("/:cid/product", GetProductsinCart)

cartRouter.post("/:cid/purchase", PurchaseCartController)

cartRouter.post("/:cid/clearcart", ClearCartController)

export default cartRouter;
