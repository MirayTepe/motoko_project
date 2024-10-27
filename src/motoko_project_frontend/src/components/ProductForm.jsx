import React, { useState } from 'react';

const ProductForm = ({ onAddProduct }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stockAmount, setStockAmount] = useState(0);
    const [photoUrl, setPhotoUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddProduct(name, price, description, category, stockAmount, photoUrl);
        setName('');
        setPrice(0);
        setDescription('');
        setCategory('');
        setStockAmount(0);
        setPhotoUrl('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Stock Amount"
                value={stockAmount}
                onChange={(e) => setStockAmount(Number(e.target.value))}
                required
            />
            <input
                type="text"
                placeholder="Photo URL"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home">Home</option>
            </select>
            <button type="submit">Add Product</button>
        </form>
    );
};

export default ProductForm;
