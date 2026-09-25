import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaLeaf,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaArrowRight,
} from 'react-icons/fa';
import { useCompany } from '../context/CompanyContext';

const serviceLinks = [
  { label: 'Web Development', to: '/services' },
  { label: 'Mobile Apps', to: '/services' },
  { label: 'AI Solutions', to: '/services' },
  { label: 'Custom Software', to: '/services' },
  { label: 'UI/UX Design', to: '/services' },
];

const companyLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Our Works', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'Products', to: '/products' },
  { label: 'Industries', to: '/industries' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
];

/**
 * Footer - Dark footer with company info from context, nav links, social links
 */
const Footer = () => {
  const { company } = useCompany();
  const social = company?.social_links || {};

  return (
    <footer className="footer">
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand Column */}
          <div>
            <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: '#0f172a',
                  border: '2px solid #d94452',
                  boxShadow: '0 0 15px rgba(217, 68, 82, 0.35)',
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
              <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#ffffff' }}>
                <span style={{ color: '#d94452' }}>Aventrix</span> Solutions
              </span>
            </div>

            <p className="footer-tagline">
              Turning ideas into powerful digital solutions. We build websites, apps, and
              AI-powered software that help businesses grow faster.
            </p>

            <div className="footer-social">
              <a
                href={social.facebook || '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href={social.twitter || '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href={social.linkedin || '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href={social.instagram || '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>
                    <span style={{ marginRight: '0.4rem', color: '#d94452', fontSize: '0.7rem' }}>›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>
                    <span style={{ marginRight: '0.4rem', color: '#d94452', fontSize: '0.7rem' }}>›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="footer-heading">Get In Touch</h4>

            <div className="footer-contact-item">
              <FaMapMarkerAlt className="footer-contact-icon" />
              <div className="footer-contact-text">
                {company?.address || 'Ahmedabad, Gujarat, India'}
              </div>
            </div>

            <div className="footer-contact-item">
              <FaPhone className="footer-contact-icon" />
              <div className="footer-contact-text">
                <a
                  href={`tel:${company?.phone || '+919876543210'}`}
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  {company?.phone || '+91 98765 43210'}
                </a>
              </div>
            </div>

            <div className="footer-contact-item">
              <FaEnvelope className="footer-contact-icon" />
              <div className="footer-contact-text">
                <a
                  href={`mailto:${company?.email || 'hello@aventrixsolutions.com'}`}
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  {company?.email || 'hello@aventrixsolutions.com'}
                </a>
              </div>
            </div>

            {/* Mini CTA */}
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '1rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#d94452',
                transition: 'gap 0.2s',
              }}
            >
              Book a Free Call <FaArrowRight style={{ fontSize: '0.7rem' }} />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 Aventrix Solutions. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
