import { Router, json } from "express";
import { GetRealTimeProductsController, ChatController, ProductViewController, HomeController, LoginViewController, ProfileViewController, ForgotViewController, SignupViewContoller, errorController, loggerTestController, newPasswordViewController, compraRealizada, createProductController, toPremiumController, deleteProductController } from "../controllers/views.controller.js";
import { checkRole } from "../middlewares/roles.js";
import compression from "express-compression";


const viewsRouter = Router();
viewsRouter.use(json());

viewsRouter.get("/real-time-products", GetRealTimeProductsController)

viewsRouter.get("/chat", checkRole(["user", "premium"]), ChatController)

viewsRouter.get("/products", compression({ brotli: { enable: true, zlib: {} } }), ProductViewController);

viewsRouter.get("/", compression({ brotli: { enable: true, zlib: {} } }), HomeController);

viewsRouter.get("/login", LoginViewController);

viewsRouter.get("/profile", ProfileViewController);

viewsRouter.get("/forgot", ForgotViewController);

viewsRouter.get("/signup", SignupViewContoller);

viewsRouter.get("/error", errorController)

viewsRouter.get("/loggerTest", loggerTestController)

viewsRouter.get("/newPassword", newPasswordViewController)

viewsRouter.get("/compraRealizada", compraRealizada)

viewsRouter.get("/createProduct", checkRole(["admin", "premium"]), createProductController)

viewsRouter.get("/deleteProduct", checkRole(["admin"]), deleteProductController)

viewsRouter.get("/topremium", toPremiumController)

export default viewsRouter;