import { ProductService } from "../services.js";
import { ProductView } from "../view/productView.js";

export const ProductController = {
  async addProduct(name, price, description, category, stockAmount, photoUrl) {
    const productId = await ProductService.addProduct(name, price, description, category, stockAmount, photoUrl);
    ProductView.showMessage(`Ürün eklendi, ID: ${productId}`);
  },

  async displayAllProducts() {
    const products = await ProductService.getAllProducts();
    ProductView.renderProducts(products);
  },

  async updateStock(id, inStock) {
    const success = await ProductService.updateStockStatus(id, inStock);
    ProductView.showMessage(success ? "Stok durumu güncellendi" : "Ürün bulunamadı");
  },

  async getProduct(id) {
    try {
      const product = await ProductService.getProduct(id);
      return product;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  // Yorum ekleme
  async addComment(id, comment) {
    try {
      await ProductService.addComment(id, comment);
      ProductView.showMessage("Yorum başarıyla eklendi.");
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  },

  // Ürünü puanlama
  async rateProduct(id, rating) {
    try {
      await ProductService.rateProduct(id, rating);
      ProductView.showMessage("Ürün puanı başarıyla güncellendi.");
    } catch (error) {
      console.error("Error rating product:", error);
      throw error;
    }
  }
};
