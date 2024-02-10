import fs from "fs";
import { __dirname } from "../../utils.js"
import { nextID, nextCartId } from "./utilidades.js";

const path = __dirname + "/dao/json/cart.json"

class CartManager {

    constructor() {
        console.log("Trabajando con FileSystem")
    }

    async getCarts() {
        try {
            const carts = await fs.promises.readFile(path, "utf-8");
            return JSON.parse(carts);
        } catch (error) {
            return [];
        }
    }

    async getCartbyId(cid) {
        const id = Number(cid)
        const carts = await this.getCarts();
        const cartFilter = carts.find((cart) => cart.id == id);
        if (!cartFilter) {
            console.log("Carrito no encontrado");
        } else {
            return cartFilter;
        }
    }

    async getCartProducts(cid) {
        const id = Number(cid)
        const cart = await this.getCartbyId(id);
        return cart.products;
    }

    async addCart() {
        let carts = await this.getCarts();
        const newCart = {
            id: nextCartId(carts),
            products: [],
        }
        await fs.promises.writeFile(path, JSON.stringify([...carts, newCart]));
    }

    async addProducttoCart(cid, pid){
        const cartid = Number(cid)
        const prodId = Number(pid);
        const carts = await this.getCarts();
        const cart = await this.getCartbyId(cartid);

        let prodInCart = cart.products.find((p) => p._id == prodId)

        if (prodInCart){ 
            prodInCart.quantity += 1 
            let ProductsInCart = cart.products.filter((prod) => prod._id !== prodInCart._id)
            let newCartProducts = [...ProductsInCart, prodInCart]
            cart.products = newCartProducts;
            let newCarts = carts.filter((cart) => cart.id !== cartid)
            newCarts = [...newCarts, cart]
            await fs.promises.writeFile(path, JSON.stringify(newCarts))
        } else {
            cart.products = [...cart.products, { _id: prodId, quantity: 1 }]
            let newCarts = carts.filter((cart) => cart.id !== cartid)
            newCarts = [...newCarts, cart]
            await fs.promises.writeFile(path, JSON.stringify(newCarts))
        }
    }

    async deleteCart(cid) {
        const cartid = Number(cid)
        const carts = await this.getCarts();
        const verificacion = carts.some(cart => cart.id == cartid)
        try {
            if (!verificacion) {
                return ("No existe ese carrito")
            } else {
                const aux = carts.filter((cart) => cart.id !== cartid);
                await fs.promises.writeFile(path, JSON.stringify(aux)); //reescribo el archivo
                return (`Se ha eliminado el carrito con el id : ${cartid}`);
            }
        } catch (error) {
            throw new error
        }
    }
};

async function eliminarArchivo(path) {
    await fs.promises.unlink(path);
}

export default CartManager;
