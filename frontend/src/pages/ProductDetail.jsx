import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaSeedling,
  FaFileInvoiceDollar,
  FaBoxes,
  FaUsers,
  FaChartBar,
  FaCogs,
  FaDesktop,
  FaPrint,
  FaReceipt,
  FaUndoAlt,
  FaWarehouse,
  FaCalculator,
  FaShieldAlt
} from 'react-icons/fa';
import AnimatedSection from '../components/AnimatedSection';
import SEO from '../components/SEO';
import api from '../config/api';

const moduleIcons = {
  'Dashboard': FaDesktop,
  'New Billing': FaFileInvoiceDollar,
  'Bill History': FaReceipt,
  'Sales Return': FaUndoAlt,
  'Payment Receipts': FaCalculator,
  'Farmers': FaUsers,
  'Products': FaBoxes,
  'Stock Management': FaWarehouse,
  'Purchase Entry': FaFileInvoiceDollar,
  'Purchase Return': FaUndoAlt,
  'Accounting & Ledgers': FaChartBar,
  'Reports & Analytics': FaChartBar,
  'Company Settings': FaCogs,
};

const fallbackProduct = {
  id: 1,
  name: 'KrushiBill ERP',
  slug: 'krushibill-erp',
  description: 'KrushiBill ERP is an advanced, specialized billing and inventory management software engineered specifically for agriculture pesticide, fertilizer, and seeds dealers. Built to handle complex batch tracking, farmer accounts, purchase returns, and multi-format GST invoicing.',
  features: [
    'Fast & intuitive GST billing with instant print (A4 & Thermal support)',
    'Batch number, expiry date, and manufacturing tracking for all pesticides and seeds',
    'Farmer ledger management with outstanding balance alerts and khata statements',
    'Integrated sales return and purchase return management with instant ledger adjustment',
    'Real-time low-stock alerts and automatic re-order calculations',
    'Daily sales summary, margin analysis, and monthly GST tax report exports',
    'Multi-user role access with administrator and operator permissions',
    'Seamless backup and recovery ensuring complete data safety'
  ],
  modules: [
    'Dashboard',
    'New Billing',
    'Bill History',
    'Sales Return',
    'Payment Receipts',
    'Farmers',
    'Products',
    'Stock Management',
    'Purchase Entry',
    'Purchase Return',
    'Accounting & Ledgers',
    'Reports & Analytics',
    'Company Settings'
  ]
};

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(fallbackProduct);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/products/${slug}`)
      .then((res) => {
        const item = res.data?.data || res.data;
        if (item && typeof item === 'object') {
          setProduct({ ...fallbackProduct, ...item });
        }
      })
      .catch(() => {
        setProduct(fallbackProduct);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const modulesList = Array.isArray(product.modules) ? product.modules : fallbackProduct.modules;
  const featuresList = Array.isArray(product.features) ? product.features : fallbackProduct.features;

  return (
    <div className="page-wrapper">
      <SEO
        title={`${product.name} — Agriculture Billing & ERP Software`}
        description={product.description || `Explore ${product.name}, the specialized billing, inventory, and ledger ERP software for agricultural dealers by Aventrix Solutions.`}
        keywords={`${product.name}, agriculture billing software, pesticide seeds ERP, GST billing ERP, Aventrix Solutions`}
        canonicalUrl={`/products/${slug}`}
      />

      {/* Product Hero */}
      <section style={{ background: '#2d2d2d', color: '#fff', paddingTop: '160px', paddingBottom: '90px' }}>
        <div className="container">
          <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', marginBottom: '24px', fontSize: '0.95rem' }}>
            <FaArrowLeft /> Back to all products
          </Link>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: '750px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(53, 187, 155, 0.2)', border: '1px solid #35bb9b', color: '#35bb9b', padding: '6px 16px', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '16px' }}>
                <FaSeedling />
                <span>Agriculture Software Suite</span>
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '20px' }}>
                {product.name}
              </h1>
              <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: '32px' }}>
                {product.description}
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn-primary">
                  <span>Request Live Demo</span>
                  <span className="arrow-circle">
                    <FaArrowRight size={12} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Covered Section */}
      <section style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div className="container">
          <AnimatedSection>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <span style={{ color: '#d94452', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Comprehensive Architecture
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#1e293b', marginTop: '8px', marginBottom: '16px' }}>
                13 Core Modules Covered
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '650px', margin: '0 auto' }}>
                Everything your pesticide and seed dealership needs, structured into dedicated workflow modules.
              </p>
            </div>
          </AnimatedSection>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '20px'
          }}>
            {modulesList.map((modName, idx) => {
              const IconComp = moduleIcons[modName] || FaCheckCircle;
              return (
                <AnimatedSection key={idx}>
                  <div style={{
                    background: '#fff',
                    padding: '24px 20px',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{
                      background: 'rgba(53, 187, 155, 0.1)',
                      color: '#35bb9b',
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      flexShrink: 0
                    }}>
                      <IconComp />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                        {modName}
                      </h4>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Module #{idx + 1}</span>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Detail Section */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
            <AnimatedSection>
              <div>
                <span style={{ color: '#35bb9b', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Features & Functionality
                </span>
                <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#1e293b', marginTop: '10px', marginBottom: '24px' }}>
                  Designed specifically for Agriculture Retailers
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {featuresList.map((feat, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <div style={{ background: 'rgba(217, 68, 82, 0.12)', color: '#d94452', padding: '6px', borderRadius: '50%', marginTop: '3px', flexShrink: 0 }}>
                        <FaCheckCircle size={14} />
                      </div>
                      <p style={{ color: '#334155', fontSize: '1.05rem', lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                        {feat}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Benefit Box */}
            <AnimatedSection>
              <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '24px', padding: '40px', color: '#fff' }}>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '20px' }}>
                  Why Agri-Dealers Choose KrushiBill ERP
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                  <div>
                    <h4 style={{ color: '#35bb9b', fontSize: '1.1rem', fontWeight: 600, marginBottom: '6px' }}>10x Faster Invoicing</h4>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem' }}>Create bills with item search by brand, composition, or barcode in seconds during peak season rush.</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#35bb9b', fontSize: '1.1rem', fontWeight: 600, marginBottom: '6px' }}>Zero Stock Discrepancies</h4>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem' }}>Batch-level tracking prevents selling expired stock and keeps inventory audits accurate.</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#35bb9b', fontSize: '1.1rem', fontWeight: 600, marginBottom: '6px' }}>Farmer Trust & Transparent Khata</h4>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem' }}>Print complete transaction ledgers for farmers with clear debit, credit, and pending balance summaries.</p>
                  </div>
                </div>

                <Link to="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <span>Book Free Software Demo</span>
                  <span className="arrow-circle">
                    <FaArrowRight size={12} />
                  </span>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
