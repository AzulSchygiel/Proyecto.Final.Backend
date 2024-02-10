import productModel from "../models/products.models.js";
import cartModel from "../models/carts.models.js";

class ProductManager {

  constructor() {
    console.log("Trabajando con DB!")
  }

  async getProducts(limit, page, category) {
    let limitOp = limit ? limit : 4;
    let pageOp = page ? page : 1;
    let categoryOp = category ? category : undefined;
    try {
      if (categoryOp == undefined) {
        const products = await productModel.paginate({}, { limit: limitOp, lean: true, page: page ?? pageOp })
        return products;
      } else {
        const products = await productModel.paginate({ category: categoryOp }, { limit: limitOp, lean: true, page: page ?? pageOp })
        return products;
      }
    } catch (error) {
      return [];
    }
  }

  async getProductbyId(id) {
    const productsFilter = await productModel.findById(id);
    if (!productsFilter) {
      console.log("Producto no encontrado");
    } else {
      return productsFilter;
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock, category, owner, status) {

    const product = { title, description, price, thumbnail, code, stock, category, owner, status }
    const result = await productModel.create(product);
    console.log("Producto Agregado!")
    return result;
  }

  async updateProduct(id, newinfo) {
    try {
      const updateProduct = await productModel.findOneAndReplace({ _id: id }, newinfo)
      return updateProduct;
    } catch (error) {
      console.log(`El producto con id: ${id} no se encuentra en la base de datos`)
      throw new Error;
    }
  }

  async deleteProduct(id) {
    try {
      const result = await productModel.deleteOne({ _id: id });
      return result
    } catch (error) {
      console.log("No se pudo eliminar el producto")
      throw new Error;
    }
  }

  async reduceStock(id, stock) {
    try {
      const productToUpdate = await productModel.findById(id)
      if (productToUpdate.stock < stock) {
        return ("El stock del producto es menor que la cantidad solicitada ")
      } else {
        const newStock = Number(productToUpdate.stock) - Number(stock)
        const newinfo = {
          title: productToUpdate.title,
          description: productToUpdate.description,
          price: productToUpdate.price,
          thumbnail: productToUpdate.thumbnail,
          code: productToUpdate.code,
          stock: newStock,
          category: productToUpdate.category,
          status: productToUpdate.status
        }
        this.updateProduct(id, newinfo)
      }
    } catch (error) {
      throw new Error
    }
  }
}

export default ProductManager;
