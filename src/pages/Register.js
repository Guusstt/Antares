import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/api';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    alamat: '',
    no_telepon: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (registerError) {
      setRegisterError('');
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
    if (!formData.password) {
      newErrors.password = 'Password harus diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }
    if (!formData.alamat.trim()) newErrors.alamat = 'Alamat harus diisi';
    if (!formData.no_telepon.trim()) newErrors.no_telepon = 'Nomor telepon harus diisi';

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
      await register(
        formData.name,
        formData.email,
        formData.password,
        formData.alamat,
        formData.no_telepon
      );

      alert('Pendaftaran berhasil! Silakan login.');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      setRegisterError('Gagal mendaftar. Pastikan email belum digunakan dan data valid.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Daftar Akun</h1>

        {registerError && <div className="error-alert">{registerError}</div>}

        <form onSubmit={handleSubmit} className="register-form">
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Konfirmasi Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="alamat">Alamat</label>
            <input
              type="text"
              id="alamat"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              className={errors.alamat ? 'error' : ''}
            />
            {errors.alamat && <span className="error-message">{errors.alamat}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="no_telepon">No. Telepon</label>
            <input
              type="text"
              id="no_telepon"
              name="no_telepon"
              value={formData.no_telepon}
              onChange={handleChange}
              className={errors.no_telepon ? 'error' : ''}
            />
            {errors.no_telepon && <span className="error-message">{errors.no_telepon}</span>}
          </div>

          <button type="submit" className="register-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Loading...' : 'Daftar'}
          </button>
        </form>

        <div className="auth-links">
          <p>
            Sudah punya akun? <Link to="/login">Login disini</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
