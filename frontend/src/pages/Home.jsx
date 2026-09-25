import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaRocket,
  FaGlobe,
  FaMobileAlt,
  FaRobot,
  FaCode,
  FaComments,
  FaChevronDown,
  FaCheckCircle,
  FaLeaf,
  FaShoppingCart,
  FaHeartbeat,
  FaGraduationCap,
  FaStar,
  FaPlay,
} from 'react-icons/fa';
import AnimatedSection from '../components/AnimatedSection';
import StatCounter from '../components/StatCounter';
import TestimonialCarousel from '../components/TestimonialCarousel';
import IndustryCard from '../components/IndustryCard';
import StackingCards from '../components/StackingCards';
import api from '../config/api';

// Default services for accordion when API unavailable
const defaultServices = [
  {
    id: 1,
    title: 'Web Development',
    icon: 'FaGlobe',
    IconComp: FaGlobe,
    description:
      'We craft high-performance, SEO-optimized websites and web applications using React, Next.js, and modern frameworks. From landing pages to complex platforms, we deliver solutions that convert.',
  },
  {
    id: 2,
    title: 'Mobile App Development',
    icon: 'FaMobileAlt',
    IconComp: FaMobileAlt,
    description:
      'Native and cross-platform mobile apps for iOS and Android using React Native and Flutter. Beautiful UX, powerful performance, and seamless integration with backend services.',
  },
  {
    id: 3,
    title: 'AI & Machine Learning',
    icon: 'FaRobot',
    IconComp: FaRobot,
    description:
      'Integrate the power of AI into your business. We build custom ML models, chatbots, recommendation engines, and automation pipelines that create real competitive advantages.',
  },
  {
    id: 4,
    title: 'Custom Software',
    icon: 'FaCode',
    IconComp: FaCode,
    description:
      'Tailor-made ERP systems, CRMs, and business tools designed around your specific workflows. Our custom software eliminates inefficiencies and scales with your growth.',
  },
  {
    id: 5,
    title: 'Chatbot Solutions',
    icon: 'FaComments',
    IconComp: FaComments,
    description:
      'AI-powered chatbots for customer support, lead generation, and internal automation. Deploy on WhatsApp, websites, and apps to delight users 24/7.',
  },
];

const industries = [
  {
    id: 1,
    title: 'Agriculture',
    description:
      'Smart farming tools, crop management systems, and supply chain solutions that modernize agricultural operations and increase yields for farmers.',
    icon: 'FaLeaf',
    bgColor: '#f0faf4',
    textColor: '#1a4731',
    iconBg: 'rgba(76, 175, 80, 0.15)',
  },
  {
    id: 2,
    title: 'Retail & E-commerce',
    description:
      'End-to-end retail platforms, POS systems, inventory management, and customer loyalty apps that drive sales and streamline operations.',
    icon: 'FaShoppingCart',
    bgColor: '#eff6ff',
    textColor: '#1e3a5f',
    iconBg: 'rgba(33, 150, 243, 0.15)',
  },
  {
    id: 3,
    title: 'Healthcare',
    description:
      'Patient management, telemedicine platforms, appointment booking, and health record systems that improve care delivery and administrative efficiency.',
    icon: 'FaHeartbeat',
    bgColor: '#fff5f5',
    textColor: '#5f1e1e',
    iconBg: 'rgba(244, 67, 54, 0.15)',
  },
  {
    id: 4,
    title: 'Education',
    description:
      'Learning management systems, virtual classrooms, student portals, and EdTech platforms that make education accessible and engaging.',
    icon: 'FaGraduationCap',
    bgColor: '#fff8ee',
    textColor: '#5f3e0d',
    iconBg: 'rgba(255, 152, 0, 0.15)',
  },
];

const stats = [
  { end: 1, suffix: '+', label: 'Years Active' },
  { end: 10, suffix: '+', label: 'Projects Delivered' },
  { end: 5, suffix: '', label: 'Services Offered' },
  { end: 100, suffix: '%', label: 'Client Satisfaction' },
];

const aboutFeatures = [
  'Full-stack development expertise',
  'Agile & transparent project process',
  'Dedicated post-launch support',
  'AI-first engineering approach',
  'On-time delivery guarantee',
  'Competitive & transparent pricing',
];

/**
 * Home Page - Main landing page with all sections
 */
const Home = () => {
  const [services, setServices] = useState(defaultServices);
  const [activeService, setActiveService] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    api
      .get('/api/services')
      .then((r) => {
        const list = Array.isArray(r.data?.data) ? r.data.data : (Array.isArray(r.data) ? r.data : []);
        if (list.length > 0) {
          const mapped = list.map((s) => ({
            ...s,
            IconComp: FaCode,
          }));
          setServices(mapped);
        }
      })
      .catch(() => {});

    api
      .get('/api/testimonials')
      .then((r) => {
        const list = Array.isArray(r.data?.data) ? r.data.data : (Array.isArray(r.data) ? r.data : []);
        if (list.length > 0) setTestimonials(list);
      })
      .catch(() => {});
  }, []);

  const ActiveIcon = services[activeService]?.IconComp || FaCode;

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero-section">
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px', margin: '0 auto' }}>
          <div className="animate-fadeInUp">
            <div className="hero-badge">
              <FaRocket style={{ fontSize: '0.7rem' }} />
              Launching Digital Excellence
            </div>

            <h1>
              Turning Ideas Into{' '}
              <span className="highlight">Powerful Digital</span> Solutions.
            </h1>

            <p>
              We build websites, apps, and AI-powered software that help businesses grow
              faster. Trusted by startups and enterprises across India.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/services" className="btn-primary" style={{ fontSize: '0.95rem', padding: '12px 8px 12px 24px' }}>
                Explore Our Services
                <span className="arrow-circle">
                  <FaArrowRight style={{ fontSize: '0.75rem' }} />
                </span>
              </Link>
              <Link to="/contact" className="btn-outline-white" style={{ fontSize: '0.95rem' }}>
                Contact Our Experts
              </Link>
            </div>

         
          </div>
        </div>
      </section>

      {/* ============ ABOUT PREVIEW ============ */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '4rem',
              alignItems: 'center',
            }}
          >
            {/* Left */}
            <AnimatedSection>
              <div className="section-label">About Aventrix Solutions</div>
              <h2 className="section-title">
                Built for the Future of Digital Business
              </h2>
              <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
                Founded in January 2026 in Ahmedabad, Aventrix Solutions is a software
                company with a bold mission: to empower businesses through innovative
                software, AI, and digital solutions that create lasting value.
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.7, marginBottom: '2rem' }}>
                Our small but mighty team of 2–10 experts combines deep technical
                knowledge with creative problem-solving to deliver solutions that truly
                move the needle for our clients.
              </p>
              <Link to="/about" className="btn-primary">
                Discover Our Story
                <span className="arrow-circle">
                  <FaArrowRight style={{ fontSize: '0.75rem' }} />
                </span>
              </Link>
            </AnimatedSection>

            {/* Right - Feature List */}
            <AnimatedSection delay={150}>
              <div
                style={{
                  background: 'linear-gradient(135deg, #f9fafb, #f0faf7)',
                  borderRadius: '1.5rem',
                  padding: '2.5rem',
                  border: '1px solid #e5e7eb',
                }}
              >
                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#424852',
                    marginBottom: '1.5rem',
                  }}
                >
                  Why businesses choose us
                </h3>
                <ul className="check-list">
                  {aboutFeatures.map((f, i) => (
                    <li key={i}>
                      <FaCheckCircle className="check-icon" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div
                  style={{
                    marginTop: '2rem',
                    padding: '1.25rem',
                    background: 'white',
                    borderRadius: '1rem',
                    border: '1px solid #e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      background: 'rgba(217,68,82,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#d94452',
                      fontSize: '1.25rem',
                      flexShrink: 0,
                    }}
                  >
                    <FaPlay />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#424852' }}>
                      Ready to Get Started?
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#6b7280' }}>
                      Free consultation — no commitment
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============ SERVICES ACCORDION ============ */}
      <section className="section section-light">
        <div className="container">
          <AnimatedSection style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>
              What We Do
            </div>
            <h2 className="section-title">Our Core Services</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              From strategy to execution, we provide end-to-end digital services that
              accelerate your business growth.
            </p>
          </AnimatedSection>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem',
              alignItems: 'start',
            }}
          >
            {/* Accordion */}
            <AnimatedSection>
              <div>
                {services.slice(0, 5).map((service, idx) => (
                  <div
                    key={service.id || idx}
                    className={`accordion-item${activeService === idx ? ' active' : ''}`}
                    onClick={() => setActiveService(idx)}
                  >
                    <div className="accordion-header">
                      <div className="accordion-header-left">
                        <div className="accordion-icon-wrap">
                          {service.IconComp ? (
                            <service.IconComp />
                          ) : (
                            <FaCode />
                          )}
                        </div>
                        <h4>{service.title}</h4>
                      </div>
                      <FaChevronDown className="accordion-chevron" />
                    </div>
                    <div className="accordion-content">
                      <p>{service.description}</p>
                    </div>
                  </div>
                ))}

                <div style={{ marginTop: '1.5rem' }}>
                  <Link to="/services" className="btn-primary">
                    View All Services
                    <span className="arrow-circle">
                      <FaArrowRight style={{ fontSize: '0.75rem' }} />
                    </span>
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            {/* Icon Preview Panel */}
            <AnimatedSection delay={150}>
              <div
                style={{
                  background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0d 100%)',
                  borderRadius: '1.5rem',
                  padding: '3rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '360px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Background glow */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at center, rgba(217,68,82,0.12) 0%, transparent 70%)',
                  }}
                />

                <div
                  className="animate-float"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: '1.5rem',
                    background: 'rgba(217,68,82,0.15)',
                    border: '1px solid rgba(217,68,82,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    color: '#d94452',
                    marginBottom: '1.5rem',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <ActiveIcon />
                </div>

                <h3
                  style={{
                    color: 'white',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {services[activeService]?.title}
                </h3>

                <p
                  style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '0.85rem',
                    textAlign: 'center',
                    lineHeight: 1.7,
                    maxWidth: '280px',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {services[activeService]?.description?.slice(0, 100)}...
                </p>

                <Link
                  to={`/services/${services[activeService]?.id || ''}`}
                  className="btn-primary"
                  style={{ marginTop: '1.5rem', position: 'relative', zIndex: 1, fontSize: '0.85rem' }}
                >
                  Learn More
                  <span className="arrow-circle">
                    <FaArrowRight style={{ fontSize: '0.7rem' }} />
                  </span>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============ PORTFOLIO STACKING CARDS ============ */}
      <StackingCards />

      {/* ============ INDUSTRIES ============ */}
      <section className="section">
        <div className="container">
          <AnimatedSection style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>
              Industries We Serve
            </div>
            <h2 className="section-title">Solutions Across Sectors</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              We bring specialized domain knowledge to every project, delivering
              industry-specific solutions that solve real problems.
            </p>
          </AnimatedSection>

          <div className="grid-4">
            {industries.map((ind, i) => (
              <AnimatedSection key={ind.id} delay={i * 100}>
                <IndustryCard industry={ind} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/industries" className="btn-primary">
              Explore All Industries
              <span className="arrow-circle">
                <FaArrowRight style={{ fontSize: '0.75rem' }} />
              </span>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="section section-light">
        <div className="container">
          <AnimatedSection style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>
              Client Stories
            </div>
            <h2 className="section-title">Words From Our Clients</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Don't just take our word for it. Here's what our clients say about working
              with Aventrix Solutions.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <TestimonialCarousel testimonials={testimonials} />
          </AnimatedSection>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="cta-section">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <AnimatedSection>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '6px 16px',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'white',
                marginBottom: '1.25rem',
                letterSpacing: '0.05em',
              }}
            >
              <FaRocket style={{ fontSize: '0.7rem' }} /> Let's Build Together
            </div>

            <h2>Ready to Build Something Amazing?</h2>
            <p>
              From idea to launch, we're your technology partner every step of the way.
              Let's turn your vision into a product the world will love.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/contact"
                style={{
                  background: 'white',
                  color: '#d94452',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '12px 8px 12px 24px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                Book a Free Consultation
                <span
                  style={{
                    background: '#d94452',
                    borderRadius: '9999px',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                  }}
                >
                  <FaArrowRight style={{ fontSize: '0.75rem' }} />
                </span>
              </Link>
              <Link to="/services" className="btn-outline-white">
                View Our Work
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Home;
