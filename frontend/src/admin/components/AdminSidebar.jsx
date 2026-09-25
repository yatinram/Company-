import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {
  FaHome,
  FaCog,
  FaBox,
  FaBriefcase,
  FaStar,
  FaEnvelope,
  FaBuilding,
  FaSignOutAlt,
  FaLeaf,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: <FaHome />, end: true },
  { path: '/admin/services', label: 'Services', icon: <FaCog /> },
  { path: '/admin/products', label: 'Products', icon: <FaBox /> },
  { path: '/admin/portfolio', label: 'Portfolio', icon: <FaBriefcase /> },
  { path: '/admin/testimonials', label: 'Testimonials', icon: <FaStar /> },
  { path: '/admin/contacts', label: 'Contacts', icon: <FaEnvelope /> },
  { path: '/admin/company-settings', label: 'Company Settings', icon: <FaBuilding /> },
];

export default function AdminSidebar() {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            overflow: 'hidden',
            background: '#020617',
            border: '2px solid #d94452',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <img
            src="/aventrix-icon.png"
            alt="Aventrix Solutions"
            style={{ width: '85%', height: '85%', objectFit: 'contain' }}
          />
        </div>
        <span className="sidebar-logo-text" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
          <span style={{ color: '#d94452' }}>Aventrix</span> Admin
        </span>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">Management</div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}

        <div className="nav-section-label" style={{ marginTop: '12px' }}>Live Site</div>
        <Link to="/" target="_blank" className="nav-item">
          <FaExternalLinkAlt style={{ fontSize: '0.85rem' }} />
          <span>View Public Site</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {admin?.email ? admin.email.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">
              {admin?.email || 'admin@aventrixsolutions.com'}
            </div>
            <div className="sidebar-user-role">Super Admin</div>
          </div>
        </div>
        <button
          type="button"
          className="nav-item"
          onClick={handleLogout}
          style={{ borderRadius: '8px', marginTop: '4px', color: '#f87171' }}
        >
          <FaSignOutAlt />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
