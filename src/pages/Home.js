import React from 'react';
import { Link } from 'react-router-dom';
import { FaPills, FaStethoscope, FaTruck } from 'react-icons/fa';

function Home() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Selamat Datang di Apotek Antares</h1>
        <p>Kesehatan Anda adalah prioritas kami</p>
        <Link to="/products" className="cta-button">
          Lihat Produk
        </Link>
      </div>
      
      <div className="features-section">
        <div className="feature">
          <FaPills className="feature-icon" />
          <h3>Produk Berkualitas</h3>
          <p>Semua obat dan produk kesehatan kami terjamin kualitasnya</p>
        </div>
        <div className="feature">
          <FaStethoscope className="feature-icon" />
          <h3>Konsultasi Gratis</h3>
          <p>Konsultasikan kebutuhan kesehatan Anda dengan apoteker kami</p>
        </div>
        <div className="feature">
          <FaTruck className="feature-icon" />
          <h3>Pengiriman Cepat</h3>
          <p>Kami mengantar pesanan Anda dengan cepat dan aman</p>
        </div>
      </div>
      
      <div className="categories-section">
        <h2>Kategori Produk</h2>
        <div className="categories-grid">
          <div className="category-card">
            <h3>Obat Resep</h3>
            <Link to="/products?category=prescription">Lihat Semua</Link>
          </div>
          <div className="category-card">
            <h3>Obat Bebas</h3>
            <Link to="/products?category=otc">Lihat Semua</Link>
          </div>
          <div className="category-card">
            <h3>Vitamin & Suplemen</h3>
            <Link to="/products?category=vitamins">Lihat Semua</Link>
          </div>
          <div className="category-card">
            <h3>Perawatan Pribadi</h3>
            <Link to="/products?category=personal-care">Lihat Semua</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;