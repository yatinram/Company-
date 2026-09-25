import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaBullseye, FaLightbulb, FaShieldAlt, FaHandshake, FaBolt, FaArrowRight, FaMapMarkerAlt, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import AnimatedSection from '../components/AnimatedSection';
import { useCompany } from '../context/CompanyContext';

const coreValues = [
  {
    icon: FaLightbulb,
    title: 'Relentless Innovation',
    description: 'We continuously explore and integrate cutting-edge frameworks, AI architectures, and best practices to keep our clients ahead.',
    color: '#d94452',
    bg: 'rgba(217, 68, 82, 0.12)'
  },
  {
    icon: FaShieldAlt,
    title: 'Uncompromised Quality',
    description: 'Every line of code is structured for maintainability, security, and peak performance under high operational load.',
    color: '#35bb9b',
    bg: 'rgba(53, 187, 155, 0.12)'
  },
  {
    icon: FaHandshake,
    title: 'Customer-Centric Trust',
    description: 'We act as true technology partners with transparent communication, realistic timelines, and reliable long-term support.',
    color: '#3b82f6',
    bg: 'rgba(59, 130, 246, 0.12)'
  },
  {
    icon: FaBolt,
    title: 'Agile & Fast Execution',
    description: 'Rapid sprint cycles, iterative prototypes, and prompt rollouts ensure faster time-to-market for your digital initiatives.',
    color: '#f5ba45',
    bg: 'rgba(245, 186, 69, 0.12)'
  }
];

export default function About() {
  const { company } = useCompany();

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section style={{ background: '#2d2d2d', color: '#fff', paddingTop: '160px', paddingBottom: '80px', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span style={{ display: 'inline-block', background: 'rgba(217, 68, 82, 0.15)', color: '#d94452', padding: '6px 16px', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              About Us
            </span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '24px' }}>
              Building the Future of <span style={{ color: '#d94452' }}>Software</span>
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.7, maxWidth: '650px', margin: '0 auto' }}>
              {company?.company_name || 'Aventrix Solutions'} is a forward-thinking software development company based in Ahmedabad, delivering modern web, mobile, and AI solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Company Info */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
            <AnimatedSection>
              <div>
                <span style={{ color: '#35bb9b', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Our Story
                </span>
                <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#1e293b', marginTop: '10px', marginBottom: '20px' }}>
                  Turning Vision Into High-Impact Reality
                </h2>
                <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '20px' }}>
                  Founded in <strong>January 2026</strong> in <strong>{company?.address || 'Vaishnodevi, Ahmedabad'}</strong>, {company?.company_name || 'Aventrix Solutions'} was born with a clear focus: bridging the gap between business needs and powerful, dependable digital solutions.
                </p>
                <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '32px' }}>
                  With an agile, passionate team of dedicated software engineers, UI/UX designers, and AI specialists, we have engineered specialized platforms like <strong>KrushiBill ERP</strong> for agriculture businesses, alongside high-performance web and mobile products for diverse sectors.
                </p>

                {/* Quick Info Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
                  <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d94452', marginBottom: '8px' }}>
                      <FaCalendarAlt size={18} />
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Founded</span>
                    </div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '1.2rem', color: '#1e293b' }}>January 2026</p>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#35bb9b', marginBottom: '8px' }}>
                      <FaUsers size={18} />
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Team Size</span>
                    </div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '1.2rem', color: '#1e293b' }}>2 - 10 Specialists</p>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#3b82f6', marginBottom: '8px' }}>
                      <FaMapMarkerAlt size={18} />
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Headquarters</span>
                    </div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '1.05rem', color: '#1e293b' }}>{company?.address || 'Ahmedabad, India'}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Mission Statement Box */}
            <AnimatedSection>
              <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '24px', padding: '40px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                <div style={{ background: 'rgba(217, 68, 82, 0.15)', color: '#d94452', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', marginBottom: '24px' }}>
                  <FaBullseye />
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '16px' }}>
                  Our Mission Statement
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '28px', fontStyle: 'italic' }}>
                  "To empower businesses through innovative software, AI automation, and intuitive digital solutions that streamline operations, drive sustainable growth, and create measurable, lasting value."
                </p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '20px' }}>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: '#35bb9b', fontWeight: 600 }}>
                    Aventrix Solutions — Software Crafted with Precision
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section style={{ padding: '80px 0', background: '#f5f5f5' }}>
        <div className="container">
          <AnimatedSection>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <span style={{ color: '#d94452', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                What Guides Us
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#1e293b', marginTop: '8px' }}>
                Our Core Values
              </h2>
            </div>
          </AnimatedSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px' }}>
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <AnimatedSection key={idx}>
                  <div style={{
                    background: '#fff',
                    borderRadius: '20px',
                    padding: '32px',
                    border: '1px solid #e2e8f0',
                    height: '100%',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.04)'
                  }}>
                    <div style={{
                      background: val.bg,
                      color: val.color,
                      width: '54px',
                      height: '54px',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      marginBottom: '20px'
                    }}>
                      <Icon />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>
                      {val.title}
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                      {val.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 0', background: '#000', color: '#fff', textAlign: 'center' }}>
        <div className="container">
          <AnimatedSection>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '16px' }}>
              Want to Work with Us?
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 32px' }}>
              Whether you need a full-scale web product, AI automation, or enterprise software, we are ready to bring your ideas to life.
            </p>
            <Link to="/contact" className="btn-primary">
              <span>Get in Touch with Our Team</span>
              <span className="arrow-circle">
                <FaArrowRight size={12} />
              </span>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
