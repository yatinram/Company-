import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaArrowRight, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const closeTimer = useRef(null);
  const location = useLocation();

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setCompanyDropdownOpen(true);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setCompanyDropdownOpen(false), 220);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click or route change
  useEffect(() => {
    setCompanyDropdownOpen(false);
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCompanyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => {
    setIsOpen(false);
    setCompanyDropdownOpen(false);
  };

  const isCompanyActive = ['/about', '/work', '/our-works', '/blogs', '/careers'].includes(location.pathname);

  return (
    <nav className={`navbar-container${scrolled ? ' navbar-scrolled' : ''}`}>
      <div className="container">
        {/* Pill Navbar */}
        <div className="navbar-pill">
          {/* Brand Logo */}
          <Link to="/" className="navbar-logo" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                overflow: 'hidden',
                background: '#0f172a',
                border: '2px solid rgba(217, 68, 82, 0.5)',
                boxShadow: '0 2px 8px rgba(217, 68, 82, 0.3)',
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
            <span style={{ fontWeight: 800, fontSize: '1.12rem', letterSpacing: '-0.02em', color: '#1e293b' }}>
              <span style={{ color: '#d94452' }}>Aventrix</span> Solutions
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="navbar-links desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '4px', margin: 0, padding: 0, listStyle: 'none' }}>
            <li>
              <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/industries" className={({ isActive }) => (isActive ? 'active' : '')}>
                Industries
              </NavLink>
            </li>

            {/* Company Dropdown (Exact Match to Reference Image) */}
            <li
              ref={dropdownRef}
              style={{ position: 'relative' }}
              onMouseEnter={openDropdown}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                onClick={() => setCompanyDropdownOpen((prev) => !prev)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: isCompanyActive ? '#d94452' : '#424852',
                  padding: '8px 14px',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'color 0.2s',
                }}
              >
                <span>Company</span>
                <FaChevronDown
                  size={10}
                  style={{
                    transform: companyDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </button>

              {/* Dropdown Popup Menu */}
              {companyDropdownOpen && (
                <div
                  onMouseEnter={openDropdown}
                  onMouseLeave={scheduleClose}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#ffffff',
                    borderRadius: '16px',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0,0,0,0.1)',
                    border: '1px solid #f1f5f9',
                    padding: '12px 10px',
                    minWidth: '180px',
                    zIndex: 100,
                    animation: 'fadeIn 0.18s ease-out',
                  }}
                >
                  <Link
                    to="/work"
                    onClick={closeMenu}
                    style={{
                      display: 'block',
                      padding: '10px 16px',
                      borderRadius: '10px',
                      color: '#d94452',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      textDecoration: 'none',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#fff1f2')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    Our Works
                  </Link>

                  <Link
                    to="/about"
                    onClick={closeMenu}
                    style={{
                      display: 'block',
                      padding: '10px 16px',
                      borderRadius: '10px',
                      color: '#475569',
                      fontWeight: 500,
                      fontSize: '0.92rem',
                      textDecoration: 'none',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f8fafc';
                      e.currentTarget.style.color = '#1e293b';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#475569';
                    }}
                  >
                    About Us
                  </Link>

                  <Link
                    to="/blogs"
                    onClick={closeMenu}
                    style={{
                      display: 'block',
                      padding: '10px 16px',
                      borderRadius: '10px',
                      color: '#475569',
                      fontWeight: 500,
                      fontSize: '0.92rem',
                      textDecoration: 'none',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f8fafc';
                      e.currentTarget.style.color = '#1e293b';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#475569';
                    }}
                  >
                    Blogs
                  </Link>

                  <Link
                    to="/careers"
                    onClick={closeMenu}
                    style={{
                      display: 'block',
                      padding: '10px 16px',
                      borderRadius: '10px',
                      color: '#475569',
                      fontWeight: 500,
                      fontSize: '0.92rem',
                      textDecoration: 'none',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f8fafc';
                      e.currentTarget.style.color = '#1e293b';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#475569';
                    }}
                  >
                    Careers
                  </Link>
                </div>
              )}
            </li>

            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Desktop CTA Button */}
          <div className="desktop-only">
            <Link to="/contact" className="btn-primary">
              Book a Free Call
              <span className="arrow-circle">
                <FaArrowRight style={{ fontSize: '0.75rem' }} />
              </span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="mobile-only hamburger-btn"
            onClick={toggleMenu}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu mobile-only${isOpen ? ' open' : ''}`}>
          <div className="mobile-menu-inner">
            <NavLink to="/" end className={({ isActive }) => `mobile-menu-link${isActive ? ' active' : ''}`} onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/services" className={({ isActive }) => `mobile-menu-link${isActive ? ' active' : ''}`} onClick={closeMenu}>
              Services
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => `mobile-menu-link${isActive ? ' active' : ''}`} onClick={closeMenu}>
              Products
            </NavLink>
            <NavLink to="/industries" className={({ isActive }) => `mobile-menu-link${isActive ? ' active' : ''}`} onClick={closeMenu}>
              Industries
            </NavLink>
            <NavLink to="/work" className={({ isActive }) => `mobile-menu-link${isActive ? ' active' : ''}`} onClick={closeMenu} style={{ color: '#d94452', fontWeight: 700 }}>
              Our Works
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `mobile-menu-link${isActive ? ' active' : ''}`} onClick={closeMenu}>
              About Us
            </NavLink>
            <NavLink to="/blogs" className={({ isActive }) => `mobile-menu-link${isActive ? ' active' : ''}`} onClick={closeMenu}>
              Blogs
            </NavLink>
            <NavLink to="/careers" className={({ isActive }) => `mobile-menu-link${isActive ? ' active' : ''}`} onClick={closeMenu}>
              Careers
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `mobile-menu-link${isActive ? ' active' : ''}`} onClick={closeMenu}>
              Contact
            </NavLink>
            <div style={{ marginTop: '1rem', padding: '0.5rem 0' }}>
              <Link to="/contact" className="btn-primary" onClick={closeMenu} style={{ width: '100%', justifyContent: 'center' }}>
                Book a Free Call
                <span className="arrow-circle">
                  <FaArrowRight style={{ fontSize: '0.75rem' }} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
