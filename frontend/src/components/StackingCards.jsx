import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaCheckCircle,
  FaLeaf,
  FaRobot,
  FaShoppingCart,
  FaCode,
  FaLayerGroup,
  FaBolt,
  FaShieldAlt,
  FaChartLine
} from 'react-icons/fa';

const stackProjects = [
  {
    id: 1,
    title: 'KrushiBill ERP — Agro Dealership Platform',
    category: 'Agriculture ERP & Billing',
    categoryColor: '#35bb9b',
    badgeBg: 'rgba(53, 187, 155, 0.12)',
    cardBg: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
    borderColor: 'rgba(53, 187, 155, 0.25)',
    description:
      'Complete cloud ERP system engineered specifically for agriculture pesticide and seed dealers. Handles complex batch numbers, expiry alerts, farmer ledgers, and fast GST billing.',
    tags: ['13 Core Modules', 'Batch & Expiry Tracking', 'Farmer Ledgers', 'GST Invoicing'],
    metrics: [
      { label: 'Invoicing Speed', value: '10x Faster' },
      { label: 'Dealers Active', value: '500+ Shops' },
      { label: 'Stock Accuracy', value: '99.9%' },
    ],
    link: '/products/krushibill-erp',
    icon: FaLeaf,
    iconColor: '#35bb9b',
  },
  {
    id: 2,
    title: 'Intelligent AI Automation & Chatbots',
    category: 'AI & Machine Learning',
    categoryColor: '#d94452',
    badgeBg: 'rgba(217, 68, 82, 0.12)',
    cardBg: 'linear-gradient(135deg, #ffffff 0%, #fff1f2 100%)',
    borderColor: 'rgba(217, 68, 82, 0.25)',
    description:
      'Conversational AI assistants and workflow automation deployed across WhatsApp Business and web applications with RAG document retrieval for 24/7 customer engagement.',
    tags: ['WhatsApp AI Bot', 'RAG Knowledge Base', 'Multi-lingual 30+', 'Lead Gen Funnels'],
    metrics: [
      { label: 'Support Cost', value: '-60%' },
      { label: 'Response Time', value: '< 2 sec' },
      { label: 'Deflection Rate', value: '85%' },
    ],
    link: '/services/5',
    icon: FaRobot,
    iconColor: '#d94452',
  },
  {
    id: 3,
    title: 'Omnichannel Retail & Cloud POS Platform',
    category: 'Retail & E-commerce',
    categoryColor: '#f5ba45',
    badgeBg: 'rgba(245, 186, 69, 0.15)',
    cardBg: 'linear-gradient(135deg, #ffffff 0%, #fffbeb 100%)',
    borderColor: 'rgba(245, 186, 69, 0.3)',
    description:
      'High-throughput point-of-sale and multi-location inventory synchronization platform with customer loyalty programs and instant tax analytics.',
    tags: ['Barcode Scanning', 'Multi-Store Sync', 'Instant Thermal Print', 'Khata Ledgers'],
    metrics: [
      { label: 'Transactions/sec', value: '1,000+' },
      { label: 'Sync Latency', value: '< 100ms' },
      { label: 'Uptime SLA', value: '99.99%' },
    ],
    link: '/industries',
    icon: FaShoppingCart,
    iconColor: '#d97706',
  },
  {
    id: 4,
    title: 'Enterprise Custom Software & Mobile Suite',
    category: 'Software Engineering',
    categoryColor: '#3b82f6',
    badgeBg: 'rgba(59, 130, 246, 0.12)',
    cardBg: 'linear-gradient(135deg, #ffffff 0%, #eff6ff 100%)',
    borderColor: 'rgba(59, 130, 246, 0.25)',
    description:
      'Custom React web applications and cross-platform mobile apps engineered with robust Node.js backends, continuous CI/CD pipelines, and secure cloud architectures.',
    tags: ['React & React Native', 'Node & MySQL / Mongo', 'CI/CD Automation', 'Zero Downtime'],
    metrics: [
      { label: 'Performance Score', value: '98/100' },
      { label: 'Code Coverage', value: '95%+' },
      { label: 'Scale Capacity', value: '1M+ Users' },
    ],
    link: '/services',
    icon: FaCode,
    iconColor: '#3b82f6',
  },
];

export default function StackingCards() {
  return (
    <section className="stack-cards-section" style={{ padding: '90px 0', background: '#f8fafc' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(217, 68, 82, 0.1)',
              color: '#d94452',
              padding: '6px 16px',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '14px',
            }}
          >
            <FaLayerGroup /> Our Portfolio & Showcase
          </div>
          <h2 style={{ fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', fontWeight: 800, color: '#1e293b', marginBottom: '16px' }}>
            Transforming Ideas into Real Solutions
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#64748b', maxWidth: '650px', margin: '0 auto' }}>
            Take a look at our featured platforms and case studies as you scroll through our work.
          </p>
        </div>

        {/* Stacking Cards Container */}
        <div className="stack-cards-list" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {stackProjects.map((project, index) => {
            const IconComponent = project.icon;
            // Calculate sticky top offset so each subsequent card rests right below the previous top edge
            const stickyTop = 100 + index * 20;

            return (
              <div
                key={project.id}
                className="stack-card-item"
                style={{
                  position: 'sticky',
                  top: `${stickyTop}px`,
                  zIndex: index + 1,
                  background: project.cardBg,
                  borderRadius: '24px',
                  border: `1.5px solid ${project.borderColor}`,
                  boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0,0,0,0.1)',
                  padding: '40px',
                  marginBottom: '20px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '40px',
                    alignItems: 'center',
                  }}
                >
                  {/* Left Column: Info & Details */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                      <span
                        style={{
                          background: project.badgeBg,
                          color: project.categoryColor,
                          padding: '6px 14px',
                          borderRadius: '9999px',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          letterSpacing: '0.03em',
                        }}
                      >
                        {project.category}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>
                        Project #0{index + 1}
                      </span>
                    </div>

                    <h3 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: '16px' }}>
                      {project.title}
                    </h3>

                    <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: '24px' }}>
                      {project.description}
                    </p>

                    {/* Feature tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          style={{
                            background: '#ffffff',
                            color: '#334155',
                            border: '1px solid #e2e8f0',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <FaCheckCircle size={12} color={project.categoryColor} />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link to={project.link} className="btn-primary" style={{ display: 'inline-flex' }}>
                      <span>See in Detail</span>
                      <span className="arrow-circle">
                        <FaArrowRight size={12} />
                      </span>
                    </Link>
                  </div>

                  {/* Right Column: Visual Card Showcase */}
                  <div
                    style={{
                      background: '#0f172a',
                      borderRadius: '20px',
                      padding: '36px 30px',
                      color: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 15px 35px rgba(15, 23, 42, 0.25)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                      <div
                        style={{
                          width: '54px',
                          height: '54px',
                          borderRadius: '16px',
                          background: project.badgeBg,
                          color: project.categoryColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                        }}
                      >
                        <IconComponent />
                      </div>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: '#35bb9b',
                          background: 'rgba(53, 187, 155, 0.15)',
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          fontWeight: 600,
                        }}
                      >
                        ● Production Ready
                      </span>
                    </div>

                    <div style={{ marginBottom: '28px' }}>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', color: '#ffffff' }}>
                        Performance & Impact
                      </h4>
                      <p style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.7)', margin: 0, lineHeight: 1.6 }}>
                        Proven architecture delivering high reliability, business efficiency, and scalability.
                      </p>
                    </div>

                    {/* Metric Highlights */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '12px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        paddingTop: '20px',
                      }}
                    >
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx} style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: project.categoryColor, lineHeight: 1.2 }}>
                            {m.value}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '4px' }}>
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
