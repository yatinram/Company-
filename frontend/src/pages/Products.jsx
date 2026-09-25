import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaBox, FaCheck, FaSeedling, FaFileInvoiceDollar, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import AnimatedSection from '../components/AnimatedSection';
import api from '../config/api';

const fallbackProducts = [
  {
    id: 1,
    name: 'KrushiBill ERP',
    slug: 'krushibill-erp',
    description: 'KrushiBill ERP is a comprehensive billing and enterprise management solution tailored specifically for agriculture pesticide, fertilizer, and seeds dealers. Manage your inventory, GST billing, farmer ledgers, and government compliance in one intuitive platform.',
    features: [
      'Complete GST billing management with instant thermal & A4 print formats',
      'Real-time inventory tracking for batch-wise pesticides & seeds with expiry tracking',
      'Farmer ledger accounts, khata management & payment receipts',
      'Purchase entry with supplier invoices and auto-calculated margins',
      'Detailed analytical reports: daily sales, profit margin, stock valuation',
      'Single/multi-company management with flexible user role controls'
    ],
    modules: [
      'Dashboard', 'New Billing', 'Bill History', 'Sales Return', 'Payment Receipts',
      'Farmers', 'Products', 'Stock Management', 'Purchase Entry', 'Purchase Return',
      'Accounting & Ledgers', 'Reports & Analytics', 'Company Settings'
    ],
    tag: 'Agriculture Software',
    badgeColor: '#35bb9b'
  }
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/products')
      .then((res) => {
        const list = Array.isArray(res.data?.data) ? res.data.data : (Array.isArray(res.data) ? res.data : []);
        if (list.length > 0) {
          setProducts(list);
        } else {
          setProducts(fallbackProducts);
        }
      })
      .catch(() => {
        setProducts(fallbackProducts);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-wrapper">
      {/* Products Hero */}
      <section style={{ background: '#2d2d2d', color: '#fff', paddingTop: '160px', paddingBottom: '80px', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span style={{ display: 'inline-block', background: 'rgba(53, 187, 155, 0.15)', color: '#35bb9b', padding: '6px 16px', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Software Solutions
            </span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '24px' }}>
              Specialized Software <span style={{ color: '#d94452' }}>Products</span>
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.7, maxWidth: '650px', margin: '0 auto' }}>
              Purpose-built enterprise platforms engineered to solve niche industry pain points with simplicity and performance.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Product Showcase */}
      <section style={{ padding: '80px 0', background: '#f5f5f5' }}>
        <div className="container">
          {products.map((product) => (
            <AnimatedSection key={product.id || product.slug}>
              <div style={{
                background: '#fff',
                borderRadius: '24px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                overflow: 'hidden',
                marginBottom: '40px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ padding: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(53, 187, 155, 0.12)', color: '#35bb9b', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '16px' }}>
                      <FaSeedling />
                      <span>{product.tag || 'Enterprise ERP'}</span>
                    </div>
                    <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#1e293b', marginBottom: '16px' }}>
                      {product.name}
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '24px' }}>
                      {product.description}
                    </p>

                    {/* Features checklist */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                      {(Array.isArray(product.features) ? product.features : fallbackProducts[0].features).slice(0, 4).map((feat, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <span style={{ color: '#d94452', background: 'rgba(217, 68, 82, 0.1)', padding: '4px', borderRadius: '50%', display: 'flex', marginTop: '2px' }}>
                            <FaCheck size={10} />
                          </span>
                          <span style={{ color: '#334155', fontSize: '0.95rem', fontWeight: 500 }}>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <Link to={`/products/${product.slug || 'krushibill-erp'}`} className="btn-primary">
                      <span>Explore {product.name}</span>
                      <span className="arrow-circle">
                        <FaArrowRight size={12} />
                      </span>
                    </Link>
                  </div>

                  {/* Modules quick preview card */}
                  <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '20px', padding: '32px', color: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                      <div style={{ background: '#35bb9b', padding: '10px', borderRadius: '12px', color: '#fff' }}>
                        <FaFileInvoiceDollar size={22} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Included Modules</h4>
                        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Complete ERP Suite Coverage</p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                      {(Array.isArray(product.modules) ? product.modules : fallbackProducts[0].modules).map((mod, idx) => (
                        <span key={idx} style={{
                          background: 'rgba(255,255,255,0.1)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: '8px',
                          padding: '6px 12px',
                          fontSize: '0.85rem',
                          color: '#e2e8f0'
                        }}>
                          {mod}
                        </span>
                      ))}
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>Designed for Agri-Dealers</span>
                      <span style={{ fontSize: '0.85rem', color: '#35bb9b', fontWeight: 600 }}>100% GST Compliant</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Request Custom Product / Demo */}
      <section style={{ padding: '80px 0', background: '#fff', textAlign: 'center' }}>
        <div className="container">
          <AnimatedSection>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>
                Need a Custom Software Solution?
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: 1.7, marginBottom: '32px' }}>
                We also build custom SaaS products, enterprise CRMs, and mobile apps tailored to your unique operational workflows.
              </p>
              <Link to="/contact" className="btn-primary">
                <span>Request a Product Demo</span>
                <span className="arrow-circle">
                  <FaArrowRight size={12} />
                </span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
