import React, { useState, useEffect } from "react";
import { ProductService } from "../js/services";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        const result = await ProductService.getAllProducts();
        setProducts(result);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleSeedData = async () => {
        await ProductService.seedMockData();
        loadProducts(); // Reload products after seeding
    };

    return (
        <div>
            <h1>Product List</h1>
            <button onClick={handleSeedData}>Seed Mock Data</button>
            {products.map((product) => (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Price: {product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;