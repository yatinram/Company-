import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBriefcase,
  FaExternalLinkAlt,
  FaArrowRight,
  FaCheckCircle,
  FaLayerGroup,
  FaLaptopCode,
  FaMobileAlt,
  FaRobot,
  FaGlobe,
  FaServer
} from 'react-icons/fa';
import AnimatedSection from '../components/AnimatedSection';
import api from '../config/api';

const fallbackWorks = [
  {
    id: 1,
    title: 'R Services — Enterprise Software & Web Platform',
    description:
      'Comprehensive service management, real-time client tracking, and automated service delivery portal built with high-performance React frontend, scalable Node.js REST API, and automated SMS/email alerts.',
    image: '',
    link: 'https://ragricultureservices.com',
    category: 'Web & Enterprise Platform',
    tags: ['React.js', 'Node.js & Express', 'MySQL / Sequelize', 'RESTful API', 'Cloud Architecture'],
    metrics: [
      { label: 'Platform Uptime', value: '99.9%' },
      { label: 'Client Efficiency', value: '+45%' },
      { label: 'Turnaround Time', value: '2x Faster' },
    ],
  },
];

export default function OurWorks() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/api/portfolio')
      .then((res) => {
        const list = Array.isArray(res.data?.data) ? res.data.data : Array.isArray(res.data) ? res.data : [];
        if (list.length > 0) {
          // Merge fallback properties for rich display
          const merged = list.map((item, idx) => ({
            ...fallbackWorks[idx],
            ...item,
            category: item.category || fallbackWorks[idx]?.category || 'Enterprise Solution',
            tags: item.tags || fallbackWorks[idx]?.tags || ['Custom Software', 'Web Development', 'Cloud API'],
            metrics: item.metrics || fallbackWorks[idx]?.metrics || [
              { label: 'Status', value: 'Live' },
              { label: 'Performance', value: 'High' },
              { label: 'Quality', value: 'Enterprise' },
            ],
          }));
          setWorks(merged);
        } else {
          setWorks(fallbackWorks);
        }
      })
      .catch((err) => {
        console.warn('Portfolio fetch notice:', err?.message);
        setWorks(fallbackWorks);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <section style={{ background: '#2d2d2d', color: '#fff', paddingTop: '160px', paddingBottom: '90px', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(217, 68, 82, 0.15)',
                color: '#d94452',
                padding: '6px 16px',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 600,
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Our Works & Portfolio
            </span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '24px' }}>
              Delivering Proven Digital <span style={{ color: '#d94452' }}>Impact</span>
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.7, maxWidth: '650px', margin: '0 auto' }}>
              Explore real-world software, web applications, and enterprise platforms we have built and delivered for our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Works Grid / Showcase */}
      <section style={{ padding: '80px 0', background: '#f5f5f5' }}>
        <div className="container">
          <AnimatedSection>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#1e293b', marginBottom: '14px' }}>
                Featured Client Projects
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
                Each project represents clean engineering, user-focused design, and measurable business growth.
              </p>
            </div>
          </AnimatedSection>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {works.map((work, index) => {
              const imageSrc = work.image
                ? work.image.startsWith('http')
                  ? work.image
                  : `http://localhost:5000${work.image}`
                : null;

              return (
                <AnimatedSection key={work.id || index}>
                  <div
                    style={{
                      background: '#ffffff',
                      borderRadius: '24px',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                      border: '1px solid #e2e8f0',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        padding: '40px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '40px',
                        alignItems: 'center',
                      }}
                    >
                      {/* Left: Project Details */}
                      <div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(217, 68, 82, 0.1)', color: '#d94452', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.82rem', fontWeight: 700, marginBottom: '16px' }}>
                          <FaBriefcase />
                          <span>{work.category || 'Featured Client Project'}</span>
                        </div>

                        <h3 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: '16px' }}>
                          {work.title}
                        </h3>

                        <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: '24px' }}>
                          {work.description}
                        </p>

                        {/* Tech tags */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                          {(work.tags || ['React.js', 'Node.js', 'MySQL', 'REST API']).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              style={{
                                background: '#f8fafc',
                                color: '#334155',
                                border: '1px solid #e2e8f0',
                                padding: '6px 14px',
                                borderRadius: '8px',
                                fontSize: '0.85rem',
                                fontWeight: 500,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                              }}
                            >
                              <FaCheckCircle size={12} color="#35bb9b" />
                              {tag}
                            </span>
                          ))}
                        </div>

                        {work.link ? (
                          <a
                            href={work.link}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-primary"
                            style={{ display: 'inline-flex' }}
                          >
                            <span>Visit Live Platform</span>
                            <span className="arrow-circle">
                              <FaExternalLinkAlt size={11} />
                            </span>
                          </a>
                        ) : (
                          <Link to="/contact" className="btn-primary" style={{ display: 'inline-flex' }}>
                            <span>Inquire About Similar Solution</span>
                            <span className="arrow-circle">
                              <FaArrowRight size={12} />
                            </span>
                          </Link>
                        )}
                      </div>

                      {/* Right: Media Showcase Visual */}
                      <div
                        style={{
                          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                          borderRadius: '20px',
                          padding: '36px',
                          color: '#ffffff',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          boxShadow: '0 15px 35px rgba(15, 23, 42, 0.25)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          minHeight: '300px',
                        }}
                      >
                        {imageSrc ? (
                          <img
                            src={imageSrc}
                            alt={work.title}
                            style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px', marginBottom: '20px' }}
                          />
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
                            <div
                              style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '16px',
                                background: 'rgba(217, 68, 82, 0.2)',
                                border: '1px solid #d94452',
                                color: '#d94452',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                              }}
                            >
                              <FaLaptopCode />
                            </div>
                            <div>
                              <h4 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>
                                Enterprise Architecture
                              </h4>
                              <span style={{ fontSize: '0.85rem', color: '#35bb9b' }}>● Production Verified</span>
                            </div>
                          </div>
                        )}

                        <div style={{ marginBottom: '24px' }}>
                          <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.6, margin: 0 }}>
                            Delivered with robust automated continuous integration, high data throughput, and end-to-end encryption.
                          </p>
                        </div>

                        {/* Metric Highlights */}
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '12px',
                            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                            paddingTop: '20px',
                          }}
                        >
                          {(work.metrics || fallbackWorks[0].metrics).map((m, mIdx) => (
                            <div key={mIdx} style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#35bb9b', lineHeight: 1.2 }}>
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
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '16px' }}>
                Have a Project in Mind?
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: '32px' }}>
                Let’s collaborate to build high-performance software and web solutions tailored to your operational goals.
              </p>
              <Link to="/contact" className="btn-primary">
                <span>Start Your Project</span>
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
