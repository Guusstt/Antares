import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Apotek Antares</h3>
          <p>Menyediakan obat-obatan berkualitas dengan harga terjangkau.</p>
        </div>
        <div className="footer-section">
          <h3>Kontak</h3>
          <ul>
            <li><FaPhoneAlt /> +62 123 456 7890</li>
            <li><FaEnvelope /> info@apoteksehat.com</li>
            <li><FaMapMarkerAlt /> Jl. Kesehatan No. 123, Jakarta</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Jam Operasional</h3>
          <p>Senin - Jumat: 08.00 - 21.00</p>
          <p>Sabtu - Minggu: 09.00 - 20.00</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Apotek Sehat. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;