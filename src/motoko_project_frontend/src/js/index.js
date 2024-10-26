import { ProductController } from "./controller/productController.js";

document.getElementById("addProductBtn").addEventListener("click", () => {
  const name = document.getElementById("productName").value;
  const price = Number(document.getElementById("productPrice").value);
  const description = document.getElementById("productDescription").value;
  ProductController.addProduct(name, price, description);
});

document.getElementById("loadProductsBtn").addEventListener("click", () => {
  ProductController.displayAllProducts();
});
