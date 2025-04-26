import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMedicineById } from '../services/api';
import { FaCartPlus, FaArrowLeft } from 'react-icons/fa';

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getMedicineById(id);
        setProduct(data);
      } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      const productWithQuantity = { ...product, quantity };
      addToCart(productWithQuantity);
      // Reset quantity after adding to cart
      setQuantity(1);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return <div className="error">Produk tidak ditemukan</div>;
  }

  return (
    <div className="product-detail-page">
      <Link to="/products" className="back-link">
        <FaArrowLeft /> Kembali ke Daftar Produk
      </Link>
      
      <div className="product-detail">
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-detail-image" />
        </div>
        
        <div className="product-info-container">
          <h1>{product.name}</h1>
          <p className="product-category">{product.category}</p>
          <p className="product-price">Rp {product.price.toLocaleString()}</p>
          
          <div className="product-description">
            <h3>Deskripsi</h3>
            <p>{product.description}</p>
          </div>
          
          {product.dosage && (
            <div className="product-dosage">
              <h3>Dosis</h3>
              <p>{product.dosage}</p>
            </div>
          )}
          
          {product.sideEffects && (
            <div className="product-side-effects">
              <h3>Efek Samping</h3>
              <p>{product.sideEffects}</p>
            </div>
          )}
          
          <div className="product-stock">
            <h3>Stok</h3>
            <p>{product.stock > 0 ? `${product.stock} tersedia` : 'Stok Habis'}</p>
          </div>
          
          <div className="add-to-cart-section">
            <div className="quantity-selector">
              <button 
                onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}
                disabled={product.stock <= 0}
              >
                -
              </button>
              <input 
                type="number" 
                min="1" 
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                disabled={product.stock <= 0}
              />
              <button 
                onClick={() => setQuantity(prev => (prev < product.stock ? prev + 1 : product.stock))}
                disabled={product.stock <= 0}
              >
                +
              </button>
            </div>
            
            <button 
              className="add-to-cart-btn-large" 
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              <FaCartPlus /> Tambahkan ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;