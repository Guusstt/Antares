import React from 'react';
import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">Rp {product.price.toLocaleString()}</p>
        <div className="product-actions">
          <Link to={`/products/${product.id}`} className="view-details-btn">
            Detail
          </Link>
          <button 
            className="add-to-cart-btn" 
            onClick={() => addToCart(product)}
          >
            <FaCartPlus /> Tambah
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;