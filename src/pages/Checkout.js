import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { createOrder } from '../services/api';

function Checkout({ cart, user, clearCart }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'transfer'
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Nama harus diisi';
    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon harus diisi';
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Nomor telepon tidak valid';
    }
    
    if (!formData.address.trim()) newErrors.address = 'Alamat harus diisi';
    if (!formData.city.trim()) newErrors.city = 'Kota harus diisi';
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Kode pos harus diisi';
    } else if (!/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Kode pos harus 5 digit';
    }
    
    return newErrors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Prepare order data
      const orderData = {
        userId: user ? user.id : null,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: totalPrice,
        shippingDetails: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode
        },
        paymentMethod: formData.paymentMethod,
        orderDate: new Date().toISOString()
      };
      
      // Send order to API
      const response = await createOrder(orderData);
      
      // Show order confirmation
      setOrderNumber(response.orderNumber);
      setIsOrderComplete(true);
      
      // Clear cart
      clearCart();
      
      // Redirect to home after 5 seconds
      setTimeout(() => {
        navigate('/');
      }, 5000);
      
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Terjadi kesalahan saat membuat pesanan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (cart.length === 0 && !isOrderComplete) {
    navigate('/cart');
    return null;
  }
  
  if (isOrderComplete) {
    return (
      <div className="order-complete">
        <FaCheckCircle className="success-icon" />
        <h1>Pesanan Berhasil!</h1>
        <p>Terima kasih telah berbelanja di Apotek Sehat</p>
        <p className="order-number">Nomor Pesanan: <strong>{orderNumber}</strong></p>
        <p>Detail pesanan telah dikirim ke email Anda.</p>
        <p className="redirect-message">Anda akan diarahkan ke halaman utama dalam 5 detik...</p>
      </div>
    );
  }
  
  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      
      <div className="checkout-container">
        <div className="checkout-form-container">
          <form onSubmit={handleSubmit} className="checkout-form">
            <h2>Informasi Pengiriman</h2>
            
            <div className="form-group">
              <label htmlFor="name">Nama Lengkap</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Nomor Telepon</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Alamat</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? 'error' : ''}
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">Kota</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <span className="error-message">{errors.city}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="postalCode">Kode Pos</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className={errors.postalCode ? 'error' : ''}
                />
                {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
              </div>
            </div>
            
            <h2>Metode Pembayaran</h2>
            <div className="payment-methods">
              <div className="payment-method">
                <input
                  type="radio"
                  id="transfer"
                  name="paymentMethod"
                  value="transfer"
                  checked={formData.paymentMethod === 'transfer'}
                  onChange={handleChange}
                />
                <label htmlFor="transfer">Transfer Bank</label>
              </div>
              
              <div className="payment-method">
                <input
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                />
                <label htmlFor="cod">Bayar di Tempat (COD)</label>
              </div>
              
              <div className="payment-method">
                <input
                  type="radio"
                  id="ewallet"
                  name="paymentMethod"
                  value="ewallet"
                  checked={formData.paymentMethod === 'ewallet'}
                  onChange={handleChange}
                />
                <label htmlFor="ewallet">E-Wallet</label>
              </div>
            </div>
            
            <button type="submit" className="place-order-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Memproses...' : 'Proses Pesanan'}
            </button>
          </form>
        </div>
        
        <div className="order-summary">
          <h2>Ringkasan Pesanan</h2>
          
          <div className="order-items">
            {cart.map(item => (
              <div key={item.id} className="order-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>{item.quantity} x Rp {item.price.toLocaleString()}</p>
                </div>
                <div className="item-total">
                  Rp {(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          
          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>Rp {totalPrice.toLocaleString()}</span>
            </div>
            
            <div className="total-row">
              <span>Biaya Pengiriman:</span>
              <span>Rp 10,000</span>
            </div>
            
            <div className="total-row grand-total">
              <span>Total:</span>
              <span>Rp {(totalPrice + 10000).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;