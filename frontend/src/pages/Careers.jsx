import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaArrowRight, FaMapMarkerAlt, FaBriefcase, FaCode } from 'react-icons/fa';
import AnimatedSection from '../components/AnimatedSection';

const openings = [
  {
    id: 1,
    title: 'Full-Stack React & Node Developer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Ahmedabad (On-site / Hybrid)',
    experience: '1 - 3 Years'
  },
  {
    id: 2,
    title: 'AI / Python Automation Engineer',
    department: 'AI & Data',
    type: 'Full-time',
    location: 'Ahmedabad (On-site / Hybrid)',
    experience: '1 - 3 Years'
  },
  {
    id: 3,
    title: 'UI/UX & Frontend Designer',
    department: 'Design',
    type: 'Full-time',
    location: 'Ahmedabad (On-site)',
    experience: '1 - 2 Years'
  }
];

export default function Careers() {
  return (
    <div className="page-wrapper">
      <section style={{ background: '#2d2d2d', color: '#fff', paddingTop: '160px', paddingBottom: '80px', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span style={{ display: 'inline-block', background: 'rgba(53, 187, 155, 0.15)', color: '#35bb9b', padding: '6px 16px', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase' }}>
              Join Our Team
            </span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '24px' }}>
              Build the Future with <span style={{ color: '#d94452' }}>Aventrix</span>
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.7, maxWidth: '650px', margin: '0 auto' }}>
              Work alongside passionate software engineers and AI builders on high-impact products.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: '#f5f5f5' }}>
        <div className="container">
          <AnimatedSection>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#1e293b', marginBottom: '12px' }}>
                Current Openings in Ahmedabad
              </h2>
              <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
                Explore open roles and send your resume directly to our hiring team.
              </p>
            </div>
          </AnimatedSection>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '850px', margin: '0 auto' }}>
            {openings.map((job) => (
              <AnimatedSection key={job.id}>
                <div style={{ background: '#fff', borderRadius: '16px', padding: '28px 32px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#35bb9b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {job.department}
                    </span>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e293b', marginTop: '4px', marginBottom: '10px' }}>
                      {job.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '16px', color: '#64748b', fontSize: '0.85rem' }}>
                      <span><FaMapMarkerAlt style={{ marginRight: 4 }} /> {job.location}</span>
                      <span><FaBriefcase style={{ marginRight: 4 }} /> {job.experience}</span>
                    </div>
                  </div>

                  <Link to="/contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                    <span>Apply Now</span>
                    <span className="arrow-circle">
                      <FaArrowRight size={10} />
                    </span>
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
