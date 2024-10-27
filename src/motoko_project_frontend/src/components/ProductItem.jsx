import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
    const { id, name, price, description, inStock, stockAmount, photoUrl } = product;

    return (
        <div>
            <h3>{name}</h3>
            {photoUrl && <img src={photoUrl} alt={name} style={{ width: '100px', height: '100px' }} />}
            <p>Price: {price}</p>
            <p>Description: {description}</p>
            <p>Stock: {inStock ? 'Available' : 'Out of Stock'}</p>
            <p>Stock Amount: {stockAmount}</p>
            <Link to={`/product/${id}`}>View Details</Link>
        </div>
    );
};

export default ProductItem;
