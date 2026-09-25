import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaLock, FaEnvelope, FaEye, FaEyeSlash, FaLeaf, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import api from '../../config/api';
import '../styles/admin.css';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: 'admin@aventrixsolutions.com',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please provide both email address and password.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/api/admin/login', form);
      const token = res.data?.token || res.data?.data?.token;
      const adminData = res.data?.admin || res.data?.data?.admin;

      if (!token) {
        throw new Error('Token not received from server.');
      }

      login(token, adminData);
      navigate('/admin');
    } catch (err) {
      console.error('Login error:', err);
      if (err.response && (err.response.status === 401 || err.response.status === 400)) {
        setError('Invalid email or password. Default is: admin@aventrixsolutions.com / Admin@123');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Unable to connect to backend server. Make sure the Node.js server is running on port 5000.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div style={{ marginBottom: '16px' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#64748b',
              fontSize: '0.85rem',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            <FaArrowLeft size={12} /> Return to Public Website
          </Link>
        </div>

        <div className="login-logo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <div
            style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              overflow: 'hidden',
              background: '#0f172a',
              border: '3px solid #d94452',
              boxShadow: '0 0 25px rgba(217, 68, 82, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src="/aventrix-icon.png"
              alt="Aventrix Solutions"
              style={{ width: '85%', height: '85%', objectFit: 'contain' }}
            />
          </div>
          <div className="login-brand" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
            <span style={{ color: '#d94452' }}>Aventrix</span> Admin
          </div>
        </div>

        <h2 className="login-title">Control Room Sign In</h2>
        <p className="login-subtitle">Enter your administrator credentials to manage your website</p>

        {error && (
          <div className="alert alert-error">
            <FaLock style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">
              <FaEnvelope style={{ marginRight: 6, color: '#94a3b8' }} />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="admin@aventrixsolutions.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <FaLock style={{ marginRight: 6, color: '#94a3b8' }} />
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                className="form-control"
                placeholder="Enter password (e.g. Admin@123)"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                style={{ paddingRight: 44 }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94a3b8',
                  display: 'flex',
                }}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '13px', marginTop: 12, fontSize: '1rem' }}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }}></div>
                Authenticating...
              </>
            ) : (
              'Sign In to Dashboard'
            )}
          </button>
        </form>

        <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', marginTop: '20px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
            <strong>Default Demo Credentials:</strong>
            <br />
            admin@aventrixsolutions.com / Admin@123
          </p>
        </div>
      </div>
    </div>
  );
}
