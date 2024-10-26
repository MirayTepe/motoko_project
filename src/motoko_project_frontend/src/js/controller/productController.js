import { ProductService } from "../services.js";
import { ProductView } from "../view/productView.js";

export const ProductController = {
  async addProduct(name, price, description) {
    const productId = await ProductService.addProduct(name, price, description);
    ProductView.showMessage(`Ürün eklendi, ID: ${productId}`);
  },
  async displayAllProducts() {
    const products = await ProductService.getAllProducts();
    ProductView.renderProducts(products);
  },
  async updateStock(id, inStock) {
    const success = await ProductService.updateStockStatus(id, inStock);
    ProductView.showMessage(success ? "Stok durumu güncellendi" : "Ürün bulunamadı");
  }
};
