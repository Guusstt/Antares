import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

function Navbar({ cartItemCount, user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Apotek Anatares</Link>
      </div>
      <div className="navbar-menu">
        <Link to="/" className="navbar-item">Home</Link>
        <Link to="/products" className="navbar-item">Produk</Link>
        <Link to="/cart" className="navbar-item cart-icon">
          <FaShoppingCart />
          {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
        </Link>
        {user ? (
          <div className="user-menu">
            <span>Hi, {user.name}</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="navbar-item">Login</Link>
            <Link to="/register" className="navbar-item">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;