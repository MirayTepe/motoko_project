import React, { useState, useEffect } from "react";
import { ProductService } from "../js/services";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);

    useEffect(() => {
        async function fetchProduct() {
            const result = await ProductService.getProduct(Number(id));
            setProduct(result);
        }
        fetchProduct();
    }, [id]);

    const addComment = async () => {
        await ProductService.addComment(Number(id), { username: "User1", message: comment });
        setComment("");
        await fetchProduct();
    };

    const rateProduct = async () => {
        await ProductService.rateProduct(Number(id), rating);
        setRating(0);
        await fetchProduct();
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add Comment" />
            <button onClick={addComment}>Add Comment</button>
            <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(Number(e.target.value))} />
            <button onClick={rateProduct}>Rate Product</button>
        </div>
    );
};

export default ProductDetail;
