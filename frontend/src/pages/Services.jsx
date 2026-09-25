import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCode, FaMobileAlt, FaGlobe, FaRobot, FaComments, FaServer, FaCloud, FaShieldAlt } from 'react-icons/fa';
import AnimatedSection from '../components/AnimatedSection';
import ServiceCard from '../components/ServiceCard';
import api from '../config/api';

const fallbackServices = [
  {
    id: 1,
    title: 'Website Development',
    description: 'We build modern, responsive, and high-performance websites tailored to your business needs. From landing pages to complex web portals, we deliver pixel-perfect results.',
    icon: 'FaGlobe',
    display_order: 1
  },
  {
    id: 2,
    title: 'App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android. We create seamless user experiences that drive engagement and business growth.',
    icon: 'FaMobileAlt',
    display_order: 2
  },
  {
    id: 3,
    title: 'Software Development',
    description: 'Custom enterprise software solutions that streamline your operations. Scalable, secure, and built for the future with modern architectures.',
    icon: 'FaCode',
    display_order: 3
  },
  {
    id: 4,
    title: 'AI Automation',
    description: 'Leverage the power of artificial intelligence to automate repetitive tasks, reduce costs, and unlock new levels of business efficiency.',
    icon: 'FaRobot',
    display_order: 4
  },
  {
    id: 5,
    title: 'AI Chatbots',
    description: 'Intelligent conversational AI solutions that engage your customers 24/7, answer queries, and drive conversions through natural language understanding.',
    icon: 'FaComments',
    display_order: 5
  }
];

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/services')
      .then((res) => {
        const list = Array.isArray(res.data?.data) ? res.data.data : (Array.isArray(res.data) ? res.data : []);
        if (list.length > 0) {
          setServices(list);
        } else {
          setServices(fallbackServices);
        }
      })
      .catch(() => {
        setServices(fallbackServices);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-wrapper">
      {/* Hero Banner */}
      <section className="page-hero" style={{ background: '#2d2d2d', color: '#fff', paddingTop: '160px', paddingBottom: '80px', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span style={{ display: 'inline-block', background: 'rgba(217, 68, 82, 0.15)', color: '#d94452', padding: '6px 16px', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              What We Do
            </span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '24px' }}>
              Tailored Digital & Software <span style={{ color: '#d94452' }}>Services</span>
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.7, maxWidth: '650px', margin: '0 auto' }}>
              From modern web applications to cutting-edge AI integrations and robust enterprise software, we engineer tech solutions built to scale.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section style={{ padding: '80px 0', background: '#f5f5f5' }}>
        <div className="container">
          <AnimatedSection>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>
                End-to-End Technology Capabilities
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
                Explore how our technical expertise and agile delivery deliver measurable value for your organization.
              </p>
            </div>
          </AnimatedSection>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '30px'
          }}>
            {services.map((service, index) => (
              <AnimatedSection key={service.id || index}>
                <ServiceCard service={service} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Aventrix */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <AnimatedSection>
              <div>
                <span style={{ color: '#35bb9b', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Our Approach
                </span>
                <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 700, color: '#1e293b', marginTop: '12px', marginBottom: '20px', lineHeight: 1.2 }}>
                  Engineered with Excellence, Built for Reliability
                </h2>
                <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '24px' }}>
                  We believe in code that stands the test of time. Every service engagement is backed by disciplined project management, continuous testing, and modern cloud architectures.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{ background: 'rgba(53, 187, 155, 0.15)', color: '#35bb9b', padding: '10px', borderRadius: '10px', marginTop: '2px' }}>
                      <FaServer size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', marginBottom: '4px' }}>Scalable Architecture</h4>
                      <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Cloud-native architectures that grow effortlessly with your business transaction volumes.</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{ background: 'rgba(217, 68, 82, 0.15)', color: '#d94452', padding: '10px', borderRadius: '10px', marginTop: '2px' }}>
                      <FaShieldAlt size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', marginBottom: '4px' }}>Enterprise-Grade Security</h4>
                      <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Data security and best practices baked into every layer of software development.</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{ background: 'rgba(245, 186, 69, 0.15)', color: '#f5ba45', padding: '10px', borderRadius: '10px', marginTop: '2px' }}>
                      <FaCloud size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', marginBottom: '4px' }}>Continuous Delivery & Support</h4>
                      <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Rapid iteration cycles with full deployment automation and post-launch maintenance.</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '24px', padding: '40px', color: '#fff' }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '16px' }}>Ready to kickstart your next project?</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '32px' }}>
                  Speak directly with our technical leads in Ahmedabad to assess feasibility, timelines, and tailored architectures.
                </p>
                <Link to="/contact" className="btn-primary" style={{ display: 'inline-flex' }}>
                  <span>Schedule Consultation</span>
                  <span className="arrow-circle">
                    <FaArrowRight size={12} />
                  </span>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Call to Action Bar */}
      <section style={{ padding: '60px 0', background: '#d94452', color: '#fff', textAlign: 'center' }}>
        <div className="container">
          <AnimatedSection>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, marginBottom: '16px' }}>
              Let’s Build the Software Your Business Deserves.
            </h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 28px' }}>
              Consult our team today and receive a detailed roadmap with zero obligations.
            </p>
            <Link
              to="/contact"
              style={{
                background: '#fff',
                color: '#d94452',
                padding: '14px 32px',
                borderRadius: '9999px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-block',
                boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                transition: 'transform 0.2s, background 0.2s'
              }}
            >
              Contact Us Today
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
