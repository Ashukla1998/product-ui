import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3000/product/${id}`)
      .then((response) => {
        const data = response.data;
        const formattedProduct = {
          ...data,
          image: data.image || '/dummy.png',
        };
        setProduct(formattedProduct);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.title} className="product-image" />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p className="product-price">Price: ₹{product.price}</p>
    </div>
  );
};

export default ProductDetail;
