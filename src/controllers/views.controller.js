import { manager } from "../controllers/products.controller.js"
import ChatManager from "../dao/db-managers/chat.manager.js";
import productModel from "../dao/models/products.models.js"
import { cartManager } from "../controllers/cart.controller.js";
import { addLoger2 } from "../logger/logger.js";


const chatManager = new ChatManager();
const logger = addLoger2()

export const GetRealTimeProductsController = async (req, res) => {
    const { limit, page, sort, queryKey, queryParam } = req.query
    const products = await manager.getProducts(limit, page, sort, queryKey, queryParam);
    res.render("real_time_products", { products, style: "index2", sectionName: "main" })
}

export const ChatController = async (req, res) => {
    try {
        const messages = await chatManager.getMessages();
        const userData = req.session
        res.render("chat", { userData, style: "index", sectionName: "chat", messages: messages })
    } catch (Error) {
        console.log("No se pudieron obtener los chats")
    }
}

export const ProductViewController = async (req, res) => {
    const userData = req.session
    const { limit, page } = req.query;
    const products = await manager.getProducts(limit, page)
    res.render("products", { products, userData, style: "index", sectionName: "productos" })
}

export const HomeController = async (req, res) => {
    const { limit, page, sort, queryKey, queryParam } = req.query
    const userData = req.session
    const products = await manager.getProducts(limit, page, sort, queryKey, queryParam);
    res.render("home", { products, userData, style: "index", sectionName: "main" })
}

export const LoginViewController = async (req, res) => {
    const userData = req.session
    res.render("_login", { userData, style: "index", sectionName: "login" })
}

export const ProfileViewController = async (req, res) => {
    const userData = req.session
    const cartProduct = await cartManager.getCartbyId(userData.cartid)
    res.render("_profile", { userData, cartProduct, style: "index", sectionName: "profile" })
}

export const ForgotViewController = async (req, res) => {
    const token = req.query.token;
    res.render("_forgot", { style: "index", sectionName: "forgot", token })
}

export const SignupViewContoller = async (req, res) => {
    res.render("_signup", { style: "index", sectionName: "Signup" })
}

export const errorController = async (req, res) => {
    res.render("error", { style: "index", sectionName: "error" })
}

export const loggerTestController = async (req, res) => {
    logger.fatal(`nivel fatal`)
    logger.error(`nivel error`)
    logger.warning(`nivel warning`)
    logger.info(`nivel info`)
    logger.http(`nivel http}`)
    logger.debug(`nivel debug`)
    res.send("prueba exitosa")
}

export const newPasswordViewController = async (req, res) => {
    res.render("_newpass", { style: "index", sectionName: "newpass" })
}

export const compraRealizada = async (req, res) => {
    res.render("compraRealizada", { style: "index", sectionName: "compraRealizada" })
}

export const createProductController = async (req, res) => {
    res.render("createProduct", { style: "index", sectionName: "crearProducto" })
}

export const deleteProductController = async (req, res) => {
    res.render("deleteProduct", { style: "index", sectionName: "deleteProduct" })
}

export const toPremiumController = async (req, res) => {
    const userData = req.session
    res.render("_topremium", { userData, style: "index", sectionName: "toPremium" })
}