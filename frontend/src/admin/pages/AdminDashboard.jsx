import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCog,
  FaBox,
  FaStar,
  FaEnvelope,
  FaBriefcase,
  FaArrowRight,
  FaPlus,
  FaBuilding,
  FaCheckCircle
} from 'react-icons/fa';
import AdminStatCard from '../components/AdminStatCard';
import api from '../../config/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    products: 0,
    portfolio: 0,
    testimonials: 0,
    contacts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('/api/admin/dashboard');
        const data = res.data?.data || res.data;
        if (data) {
          setStats({
            services: data.services ?? 0,
            products: data.products ?? 0,
            portfolio: data.portfolio ?? 0,
            testimonials: data.testimonials ?? 0,
            contacts: data.contacts ?? 0,
          });
        }
      } catch (err) {
        console.warn('Dashboard fetch warning:', err);
        setError('Could not load live dashboard counters. Make sure the Node.js backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-header-title">Overview Dashboard</h2>
          <p className="page-header-subtitle">
            Welcome to the Aventrix Solutions website administration center.
          </p>
        </div>
      </div>

      {error && <div className="alert alert-info">{error}</div>}

      {/* Metric Cards Grid */}
      <div className="stats-grid">
        <AdminStatCard
          label="Active Services"
          value={stats.services}
          icon={<FaCog />}
          color="red"
        />
        <AdminStatCard
          label="Software Products"
          value={stats.products}
          icon={<FaBox />}
          color="teal"
        />
        <AdminStatCard
          label="Portfolio Showcase"
          value={stats.portfolio}
          icon={<FaBriefcase />}
          color="purple"
        />
        <AdminStatCard
          label="Client Reviews"
          value={stats.testimonials}
          icon={<FaStar />}
          color="yellow"
        />
        <AdminStatCard
          label="Inquiry Leads"
          value={stats.contacts}
          icon={<FaEnvelope />}
          color="blue"
        />
      </div>

      {/* Quick Action Hub */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginTop: '32px' }}>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>
            Quick Management Links
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link
              to="/admin/services"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '10px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                textDecoration: 'none',
                color: '#1e293b',
                fontWeight: 500,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaCog style={{ color: '#d94452' }} />
                <span>Manage Services List</span>
              </div>
              <FaArrowRight size={12} color="#94a3b8" />
            </Link>

            <Link
              to="/admin/products"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '10px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                textDecoration: 'none',
                color: '#1e293b',
                fontWeight: 500,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaBox style={{ color: '#35bb9b' }} />
                <span>Manage Software Products (KrushiBill ERP)</span>
              </div>
              <FaArrowRight size={12} color="#94a3b8" />
            </Link>

            <Link
              to="/admin/testimonials"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '10px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                textDecoration: 'none',
                color: '#1e293b',
                fontWeight: 500,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaStar style={{ color: '#f5ba45' }} />
                <span>Manage Client Reviews</span>
              </div>
              <FaArrowRight size={12} color="#94a3b8" />
            </Link>

            <Link
              to="/admin/company-settings"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '10px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                textDecoration: 'none',
                color: '#1e293b',
                fontWeight: 500,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaBuilding style={{ color: '#3b82f6' }} />
                <span>Edit Company Information</span>
              </div>
              <FaArrowRight size={12} color="#94a3b8" />
            </Link>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '16px', padding: '28px', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span style={{ background: 'rgba(53, 187, 155, 0.2)', color: '#35bb9b', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
              Live Architecture
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '12px', marginBottom: '8px' }}>
              Centralized Database Powered
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Any edits made in this admin control room are stored directly in MySQL and reflect live on the public website without needing code redeployment.
            </p>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#35bb9b', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FaCheckCircle /> MySQL DB Connected
            </span>
            <Link to="/" target="_blank" className="btn btn-sm btn-primary">
              Visit Live Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
