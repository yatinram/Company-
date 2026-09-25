import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaCheckCircle, FaGlobe, FaMobileAlt, FaCode, FaRobot, FaComments, FaTools, FaCogs } from 'react-icons/fa';
import AnimatedSection from '../components/AnimatedSection';
import api from '../config/api';

const iconMap = {
  FaGlobe: FaGlobe,
  FaMobileAlt: FaMobileAlt,
  FaCode: FaCode,
  FaRobot: FaRobot,
  FaComments: FaComments,
};

const fallbackServices = {
  1: {
    id: 1,
    title: 'Website Development',
    description: 'We build modern, responsive, and high-performance websites tailored to your business needs. From landing pages to complex web portals, we deliver pixel-perfect results.',
    icon: 'FaGlobe',
    features: [
      'Custom UI/UX designed in Figma with full prototype validation',
      'Modern Jamstack & Full-stack architectures (React, Next.js, Node.js)',
      'Optimized Core Web Vitals for lightning-fast page loading speeds',
      'Search Engine Optimization (SEO) & Open Graph meta setup',
      'Responsive multi-device layout compatibility across mobile, tablet, and desktop',
      'Integrated Content Management System (CMS) for effortless updates'
    ],
    deliverables: ['Custom Codebase with Clean Documentation', 'CI/CD Automated Deployment Pipelines', 'Google Analytics & Tag Manager Setup', 'Post-Launch Technical Maintenance']
  },
  2: {
    id: 2,
    title: 'App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android. We create seamless user experiences that drive engagement and business growth.',
    icon: 'FaMobileAlt',
    features: [
      'High-performance React Native & Flutter cross-platform development',
      'Native iOS (Swift) & Android (Kotlin) app engineering',
      'Offline-first architecture with local SQLite/IndexedDB caching',
      'Seamless push notifications & deep linking implementation',
      'Secure payment gateway & in-app purchase integrations',
      'App Store and Google Play Store submission & review compliance'
    ],
    deliverables: ['Published Store Builds', 'REST & GraphQL Backend APIs', 'Push Notification Dashboard', 'Crash Analytics & Monitoring']
  },
  3: {
    id: 3,
    title: 'Software Development',
    description: 'Custom enterprise software solutions that streamline your operations. Scalable, secure, and built for the future with modern architectures.',
    icon: 'FaCode',
    features: [
      'Custom ERP & CRM development matching complex business logic',
      'Microservices & monolithic modular backends in Node.js & Python',
      'Relational (MySQL, PostgreSQL) & NoSQL database architecture',
      'Automated batch jobs, reporting pipelines, and ledger calculations',
      'Role-based access control (RBAC) & fine-grained permissioning',
      'Legacy software modernization and cloud migration'
    ],
    deliverables: ['Fully Documented REST API', 'Database Migration Scripts', 'Admin Dashboard & Control Room', 'Automated Unit & Integration Test Suites']
  },
  4: {
    id: 4,
    title: 'AI Automation',
    description: 'Leverage the power of artificial intelligence to automate repetitive tasks, reduce costs, and unlock new levels of business efficiency.',
    icon: 'FaRobot',
    features: [
      'End-to-end robotic process automation (RPA) & document extraction',
      'Intelligent data scraping, sentiment analysis, and OCR pipelines',
      'Predictive analytics & sales forecasting models',
      'Custom OpenAI, Gemini, and Claude LLM integrations into workflows',
      'Workflow orchestration using LangChain, Celery, and message queues',
      'Automated customer onboarding and validation flows'
    ],
    deliverables: ['AI Workflow Microservice', 'Custom Fine-Tuned Prompts & Pipelines', 'API Endpoints for Automation Triggers', 'Metrics & Cost Monitoring Dashboard']
  },
  5: {
    id: 5,
    title: 'AI Chatbots',
    description: 'Intelligent conversational AI solutions that engage your customers 24/7, answer queries, and drive conversions through natural language understanding.',
    icon: 'FaComments',
    features: [
      'Multi-channel deployment: WhatsApp Business API, Website Widget, Telegram',
      'Retrieval-Augmented Generation (RAG) over company PDFs and knowledge bases',
      'Human handoff seamlessly routing complex tickets to live agents',
      'Multilingual conversation capabilities supporting 30+ regional languages',
      'Context memory and intelligent slot-filling for booking/orders',
      'Analytics dashboard tracking user queries, deflection rates, and CSAT'
    ],
    deliverables: ['Embeddable React Chat Widget', 'WhatsApp Webhook Microservice', 'Vector Database Knowledge Base', 'Admin Conversation Audit Log']
  }
};

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/services/${id}`)
      .then((res) => {
        const item = res.data?.data || res.data;
        if (item && typeof item === 'object') {
          const fallback = fallbackServices[id] || {};
          setService({ ...fallback, ...item });
        } else {
          setService(fallbackServices[id] || fallbackServices[1]);
        }
      })
      .catch(() => {
        setService(fallbackServices[id] || fallbackServices[1]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '1.2rem', color: '#64748b' }}>Loading service details...</p>
      </div>
    );
  }

  const currentService = service || fallbackServices[1];
  const IconComponent = iconMap[currentService.icon] || FaTools;

  return (
    <div className="page-wrapper">
      {/* Service Hero */}
      <section style={{ background: '#2d2d2d', color: '#fff', paddingTop: '160px', paddingBottom: '90px' }}>
        <div className="container">
          <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', marginBottom: '24px', fontSize: '0.95rem' }}>
            <FaArrowLeft /> Back to all services
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(217, 68, 82, 0.2)', border: '2px solid #d94452', color: '#d94452', width: '80px', height: '80px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
              <IconComponent />
            </div>
            <div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '12px' }}>
                {currentService.title}
              </h1>
              <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.85)', maxWidth: '750px', lineHeight: 1.6 }}>
                {currentService.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
            {/* Features list */}
            <AnimatedSection>
              <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1e293b', marginBottom: '24px' }}>
                  Core Capabilities & Features
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {(currentService.features || [
                    'Tailored to your industry specific requirements',
                    'Built with cutting edge tools and robust security',
                    'Fully tested and documented for seamless scalability',
                    'Agile delivery with transparent weekly progress updates'
                  ]).map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <FaCheckCircle style={{ color: '#35bb9b', fontSize: '1.25rem', marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.5 }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Deliverables & CTA */}
            <AnimatedSection>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div style={{ background: '#fff', padding: '36px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1e293b', marginBottom: '20px' }}>
                    What You Receive
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {(currentService.deliverables || [
                      'Clean, modular and thoroughly documented source code',
                      'Automated deployment setup with continuous monitoring',
                      'Dedicated technical point of contact during rollout',
                      'SLA backed maintenance and support window'
                    ]).map((del, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', fontSize: '1rem' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#d94452', display: 'inline-block' }}></span>
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff', padding: '36px', borderRadius: '24px' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px' }}>
                    Interested in this service?
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
                    Let's discuss how {currentService.title} can accelerate your business objectives.
                  </p>
                  <Link to="/contact" className="btn-primary">
                    <span>Inquire About This Service</span>
                    <span className="arrow-circle">
                      <FaArrowRight size={12} />
                    </span>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
