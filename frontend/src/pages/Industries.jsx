import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaShoppingCart, FaHeartbeat, FaGraduationCap, FaArrowRight, FaCheck } from 'react-icons/fa';
import AnimatedSection from '../components/AnimatedSection';
import SEO from '../components/SEO';

const industries = [
  {
    id: 1,
    title: 'Agriculture',
    badge: 'Primary Sector',
    badgeColor: '#35bb9b',
    icon: FaLeaf,
    iconColor: '#35bb9b',
    iconBg: 'rgba(53, 187, 155, 0.15)',
    description: 'Transforming agribusinesses through specialized ERP billing software, seed and fertilizer dealership management, and agricultural supply chain automation.',
    solutions: [
      'KrushiBill ERP for pesticide & seed dealers',
      'Farmer ledger & khata credit tracking',
      'Batch-wise inventory & expiry date management',
      'GST billing with thermal & A4 invoice prints'
    ],
    ctaLink: '/products/krushibill-erp',
    ctaText: 'Explore KrushiBill ERP'
  },
  {
    id: 2,
    title: 'Retail & E-commerce',
    badge: 'Retail Tech',
    badgeColor: '#3b82f6',
    icon: FaShoppingCart,
    iconColor: '#3b82f6',
    iconBg: 'rgba(59, 130, 246, 0.15)',
    description: 'End-to-end retail software platforms, modern POS systems, multi-location inventory synchronizers, and e-commerce websites engineered to accelerate consumer sales.',
    solutions: [
      'Omnichannel Point-of-Sale (POS) systems',
      'Real-time multi-store inventory synchronizers',
      'Customer loyalty programs & automated SMS/WhatsApp alerts',
      'Custom B2B and D2C e-commerce platforms'
    ],
    ctaLink: '/contact',
    ctaText: 'Discuss Retail Solutions'
  },
  {
    id: 3,
    title: 'Healthcare',
    badge: 'Health Tech',
    badgeColor: '#d94452',
    icon: FaHeartbeat,
    iconColor: '#d94452',
    iconBg: 'rgba(217, 68, 82, 0.15)',
    description: 'Secure, HIPAA-conscious medical clinic software, patient records management, doctor appointment scheduling systems, and pharmacy inventory platforms.',
    solutions: [
      'Patient electronic health records (EHR) systems',
      'Automated doctor appointment scheduling & reminders',
      'Pharmacy inventory & prescription billing software',
      'Telemedicine web & mobile patient portals'
    ],
    ctaLink: '/contact',
    ctaText: 'Discuss Healthcare Solutions'
  },
  {
    id: 4,
    title: 'Education',
    badge: 'EdTech',
    badgeColor: '#f5ba45',
    icon: FaGraduationCap,
    iconColor: '#f5ba45',
    iconBg: 'rgba(245, 186, 69, 0.15)',
    description: 'Comprehensive school and institute management systems, e-learning platforms, student fee management, and interactive online examination portals.',
    solutions: [
      'Learning Management Systems (LMS) with video courses',
      'Student fee collection & digital receipts',
      'Online examination & automated grading engines',
      'Parent-teacher communication mobile applications'
    ],
    ctaLink: '/contact',
    ctaText: 'Discuss EdTech Solutions'
  }
];

export default function Industries() {
  return (
    <div className="page-wrapper">
      <SEO
        title="Industry Solutions — Agriculture, Retail, Healthcare & Education"
        description="Aventrix Solutions provides customized software architecture and digital solutions across Agriculture, Retail & E-commerce, Healthcare, and Education sectors."
        keywords="agriculture software, retail POS systems, healthcare software solutions, EdTech development, industry IT solutions, Aventrix Industries"
        canonicalUrl="/industries"
      />

      {/* Hero */}
      <section style={{ background: '#2d2d2d', color: '#fff', paddingTop: '160px', paddingBottom: '80px', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span style={{ display: 'inline-block', background: 'rgba(217, 68, 82, 0.15)', color: '#d94452', padding: '6px 16px', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Domain Expertise
            </span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '24px' }}>
              Industries We <span style={{ color: '#d94452' }}>Empower</span>
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.7, maxWidth: '650px', margin: '0 auto' }}>
              Tailored digital solutions built around the unique operational demands and regulatory needs of key market sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section style={{ padding: '80px 0', background: '#f5f5f5' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <AnimatedSection key={ind.id}>
                  <div style={{
                    background: '#fff',
                    borderRadius: '24px',
                    padding: '36px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                      <div style={{
                        background: ind.iconBg,
                        color: ind.iconColor,
                        width: '60px',
                        height: '60px',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.75rem'
                      }}>
                        <Icon />
                      </div>
                      <span style={{
                        background: `${ind.badgeColor}15`,
                        color: ind.badgeColor,
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}>
                        {ind.badge}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>
                      {ind.title}
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '24px' }}>
                      {ind.description}
                    </p>

                    <div style={{ flex: 1, marginBottom: '28px' }}>
                      <h5 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', marginBottom: '12px' }}>
                        Key Solutions:
                      </h5>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {ind.solutions.map((sol, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                            <span style={{ color: ind.iconColor, marginTop: '2px' }}>
                              <FaCheck size={12} />
                            </span>
                            <span style={{ fontSize: '0.9rem', color: '#334155' }}>{sol}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link to={ind.ctaLink} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#f8fafc',
                      color: '#1e293b',
                      padding: '12px 18px',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      border: '1px solid #e2e8f0',
                      transition: 'background 0.2s, color 0.2s'
                    }}>
                      <span>{ind.ctaText}</span>
                      <FaArrowRight size={12} style={{ color: '#d94452' }} />
                    </Link>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section style={{ padding: '80px 0', background: '#000', color: '#fff', textAlign: 'center' }}>
        <div className="container">
          <AnimatedSection>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px' }}>
                Don't See Your Industry Listed?
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: '32px' }}>
                Our engineers adapt quickly to custom domain requirements. Let’s explore your business workflows and engineer a tailored solution.
              </p>
              <Link to="/contact" className="btn-primary">
                <span>Talk to an Industry Specialist</span>
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
