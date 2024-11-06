import React from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const products = [
    { id: 1, title: 'Wayfarer Sunglasses', description: 'Stylish wayfarer sunglasses perfect for all occasions.', price: 499.0, image: '/sunglasses.jpg' },
    { id: 2, title: 'Casual T-Shirt', description: 'Comfortable cotton t-shirt for daily wear.', price: 299.0, image: '/tshirt.jpg' },
    { id: 3, title: 'Running Shoes', description: 'Durable running shoes with great grip.', price: 1299.0, image: '/shoes.jpg' },
    { id: 4, title: 'Formal Shoes', description: 'Elegant formal shoes for special occasions.', price: 1999.0, image: '/formal-shoes.jpg' },
    { id: 5, title: 'Sports Watch', description: 'Rugged and waterproof sports watch.', price: 999.0, image: '/watch.jpg' },
  ];
  const product = products.find((product) => product.id === parseInt(id));

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
