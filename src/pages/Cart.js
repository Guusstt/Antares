import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaArrowRight } from 'react-icons/fa';

function Cart({ cart, updateQuantity, removeFromCart }) {
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h1>Keranjang Belanja</h1>
        <p>Keranjang belanja Anda kosong</p>
        <Link to="/products" className="continue-shopping-btn">
          Lanjutkan Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Keranjang Belanja</h1>
      
      <div className="cart-container">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>
              
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="item-price">Rp {item.price.toLocaleString()}</p>
              </div>
              
              <div className="cart-item-actions">
                <div className="quantity-control">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>
                
                <div className="item-subtotal">
                  Rp {(item.price * item.quantity).toLocaleString()}
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-item-btn"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <h2>Ringkasan Belanja</h2>
          
          <div className="summary-row">
            <span>Total Item:</span>
            <span>{cart.reduce((total, item) => total + item.quantity, 0)}</span>
          </div>
          
          <div className="summary-row">
            <span>Total Harga:</span>
            <span className="total-price">Rp {totalPrice.toLocaleString()}</span>
          </div>
          
          <Link to="/checkout" className="checkout-btn">
            Lanjutkan ke Pembayaran <FaArrowRight />
          </Link>
          
          <Link to="/products" className="continue-shopping-link">
            Lanjutkan Belanja
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;