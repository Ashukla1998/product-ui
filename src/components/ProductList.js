import React, { useState } from 'react';
import './ProductList.css';
import { Link } from 'react-router-dom';    

const ProductList = () => {
  const initialProducts = [
    { id: 1, title: 'Wayfarer Sunglasses', description: 'Stylish wayfarer sunglasses perfect for all occasions.', price: 499.0, image: '/sunglasses.jpg' },
    { id: 2, title: 'Casual T-Shirt', description: 'Comfortable cotton t-shirt for daily wear.', price: 299.0, image: '/tshirt.jpg' },
    { id: 3, title: 'Running Shoes', description: 'Durable running shoes with great grip.', price: 1299.0, image: '/shoes.jpg' },
    { id: 4, title: 'Formal Shoes', description: 'Elegant formal shoes for special occasions.', price: 1999.0, image: '/formal-shoes.jpg' },
    { id: 5, title: 'Sports Watch', description: 'Rugged and waterproof sports watch.', price: 999.0, image: '/watch.jpg' },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScrape = () => {
    setLoading(true);
    setTimeout(() => {
      alert('Scraping simulated! No data actually fetched.');
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (range) => {
    let filteredProducts;
    if (range === 'below500') {
      filteredProducts = initialProducts.filter((product) => product.price < 500);
    } else if (range === '500to1000') {
      filteredProducts = initialProducts.filter((product) => product.price >= 500 && product.price <= 1000);
    } else if (range === 'above1000') {
      filteredProducts = initialProducts.filter((product) => product.price > 1000);
    } else {
      filteredProducts = initialProducts;
    }
    setProducts(filteredProducts);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-list-container">
      <div className="scrape-section">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter product URL"
          className="url-input"
        />
        <button onClick={handleScrape} disabled={loading} className="scrape-button">
          {loading ? 'Scraping...' : 'Scrape Product'}
        </button>
      </div>

      <div className="filter-section">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search products..."
          className="search-input"
        />
        <div className="filter-buttons">
          <button onClick={() => handleFilter('all')} className="filter-button">All</button>
          <button onClick={() => handleFilter('below500')} className="filter-button">Below ₹500</button>
          <button onClick={() => handleFilter('500to1000')} className="filter-button">₹500 - ₹1000</button>
          <button onClick={() => handleFilter('above1000')} className="filter-button">Above ₹1000</button>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.title} className="product-image" />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p className="product-price">Price: ₹{product.price}</p>
            </Link>
          </div>
          ))
        ) : (
          <p className="no-products">No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
