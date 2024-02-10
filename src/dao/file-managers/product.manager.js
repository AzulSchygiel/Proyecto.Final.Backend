import fs from "fs";
import { __dirname } from "../../utils.js"
import { nextID } from "./utilidades.js";

const path = __dirname + "/dao/json/products.json"
class ProductManager {
  ;

  constructor() {
    console.log("Trabajando con FileSystem")
  }


  async getProducts(limit, page, sort, queryKey, queryParam) {
    try {
      const productsFromFile = await fs.promises.readFile(path, "utf-8");
      const products = JSON.parse(productsFromFile)
      return products;
    } catch (error) {
      return [];
    }
  }

  async getProductbyId(id) {
    const products = await this.getProducts();
    const productsFilter = products.find((prod) => prod._id == id);
    if (!productsFilter) {
      console.log("Producto no encontrado");
    } else {
      return productsFilter;
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock, category, status) {
    const products = await this.getProducts();
    const newProduct = {
      _id: nextID(products),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
      status,
    };
    let repetido = products.find((prod) => prod.code == code);
    if (!title || !price || !thumbnail || !code || !stock) {
      console.log("Parametros faltantes");
    } else {
      if (!repetido) {
        await fs.promises.writeFile(path, JSON.stringify([...products, newProduct]));
        return (`El producto con el código: ${code} se ha agregado con exito`);
      } else {
        throw new Error;
      }
    }
  }

  async updateProduct(id, propModify) {
    const products = await this.getProducts(); 
    let aux = products.find((prod) => prod._id == id); 
    if (!aux) {
      console.log(`El producto con id: ${id} no se encuentra en la base de datos`)
      throw new Error;
    } else {
      if (Object.keys(propModify).includes("id")) {
        throw new Error;
      } else {
        if (Object.keys(propModify).includes("price")) { m
          propModify.price = parseInt(propModify.price)
        }
        if (Object.keys(propModify).includes("stock")) {
          propModify.stock = parseInt(propModify.stock)
        }
        aux = { ...aux, ...propModify };
        let newArray = products.filter((prod) => prod.id !== id); 
        newArray = [...newArray, aux]; 
        await fs.promises.writeFile(path, JSON.stringify(newArray));
        console.log("Modificación exitosa");
      }
    }
  }

  async deleteProduct(pid) {
    const products = await this.getProducts();
    const id = Number(pid)
    const verificacion = products.some(prod => prod._id == id)
    if (!verificacion) {
      throw new Error;
    } else {
      const aux = products.filter((prod) => prod._id !== id);
      await fs.promises.writeFile(path, JSON.stringify(aux));
      console.log(`Se ha eliminado el producto con el id : ${id}`);
    }
  }
}

async function eliminarArchivo(path) {
  await fs.promises.unlink(path);
}

export default ProductManager;
