import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch products on component mount
  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then((response) => {
        const formattedData = response.data.map((product) => ({
          ...product,
          image: product.image || '/dummy.png',
        }));
        setProducts(formattedData);
        setFilteredProducts(formattedData); 
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);


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
    let filteredList = products;

    if (range === 'below500') {
      filteredList = products.filter((product) => product.price < 500);
    } else if (range === '500to1000') {
      filteredList = products.filter((product) => product.price >= 500 && product.price <= 1000);
    } else if (range === 'above1000') {
      filteredList = products.filter((product) => product.price > 1000);
    }

    setFilteredProducts(filteredList);
  };


  useEffect(() => {
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

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
