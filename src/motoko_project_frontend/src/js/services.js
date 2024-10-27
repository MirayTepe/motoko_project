import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../../.dfx/local/canisters/motoko_project_frontend/service.did.js";

const canisterId = "br5f7-7uaaa-aaaaa-qaaca-cai";
const agent = new HttpAgent({ host: "https://ic0.app" });
if (process.env.NODE_ENV === "development") {
  agent.fetchRootKey();
}

const motokoActor = Actor.createActor(idlFactory, { agent, canisterId });

export const ProductService = {
  async addProduct(name, price, description, category, stockAmount, photoUrl) {
    return await motokoActor.addProduct(name, price, description, category, stockAmount, photoUrl);
  },

  async getAllProducts() {
    try {
      const products = await motokoActor.getAllProducts();
      return products;
    } catch (error) {
      console.error("Failed to fetch products:", error); // Debug output
      throw error;
    }
  },

  async getProduct(id) {
    return await motokoActor.getProduct(id);
  },

  async updateStockStatus(id, stockAmount) {
    return await motokoActor.updateStockStatus(id, stockAmount);
  },

  async addComment(id, comment) {
    return await motokoActor.addComment(id, comment);
  },

  async rateProduct(id, rating) {
    return await motokoActor.rateProduct(id, rating);
  },
  async seedMockData() {
    const mockProducts = [
      {
        name: "Mock Product 1",
        price: 100,
        description: "This is a mock product.",
        category: "Electronics",
        stockAmount: 10,
        photoUrl: null,
      },
      {
        name: "Mock Product 2",
        price: 200,
        description: "Another example product.",
        category: "Clothing",
        stockAmount: 5,
        photoUrl: null,
      },
      {
        name: "Mock Product 3",
        price: 300,
        description: "Yet another mock product.",
        category: "Home",
        stockAmount: 3,
        photoUrl: null,
      },
    ];

    for (const product of mockProducts) {
      try {
        await this.addProduct(
          product.name,
          product.price,
          product.description,
          product.category,
          product.stockAmount,
          product.photoUrl
        );
        console.log(`Added mock product: ${product.name}`);
      } catch (error) {
        console.error(`Failed to add mock product: ${product.name}`, error);
      }
    }
  }
};