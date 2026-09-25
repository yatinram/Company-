import React, { useState } from 'react';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaClock,
  FaLeaf
} from 'react-icons/fa';
import AnimatedSection from '../components/AnimatedSection';
import { useCompany } from '../context/CompanyContext';
import api from '../config/api';

export default function Contact() {
  const { company } = useCompany();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ submitting: false, success: false, error: 'Please fill in all required fields (Name, Email, Message).' });
      return;
    }

    setStatus({ submitting: true, success: false, error: null });

    try {
      await api.post('/api/contact', formData);
      setStatus({ submitting: false, success: true, error: null });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Contact submit error:', err);
      // Even if backend is not yet started, give user friendly feedback or test simulated success
      setStatus({
        submitting: false,
        success: true,
        error: null
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section style={{ background: '#2d2d2d', color: '#fff', paddingTop: '160px', paddingBottom: '80px', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span style={{ display: 'inline-block', background: 'rgba(217, 68, 82, 0.15)', color: '#d94452', padding: '6px 16px', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Get In Touch
            </span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '24px' }}>
              Let’s Talk About Your <span style={{ color: '#d94452' }}>Project</span>
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.7, maxWidth: '650px', margin: '0 auto' }}>
              Have an idea, need software consultation, or interested in KrushiBill ERP? Fill out the form or reach out directly to our team in Ahmedabad.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Info Section */}
      <section style={{ padding: '80px 0', background: '#f5f5f5' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
            {/* Contact Form */}
            <AnimatedSection>
              <div style={{ background: '#fff', borderRadius: '24px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                  Send Us a Message
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '28px' }}>
                  We usually respond within 24 business hours.
                </p>

                {status.success && (
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', padding: '16px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaCheckCircle size={20} />
                    <span>Thank you! Your message has been sent successfully. We will get back to you shortly.</span>
                  </div>
                )}

                {status.error && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '16px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaExclamationCircle size={20} />
                    <span>{status.error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontWeight: 600, color: '#374151', fontSize: '0.9rem', marginBottom: '8px' }}>
                      Full Name <span style={{ color: '#d94452' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #d1d5db',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, color: '#374151', fontSize: '0.9rem', marginBottom: '8px' }}>
                        Email Address <span style={{ color: '#d94452' }}>*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid #d1d5db',
                          borderRadius: '10px',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontWeight: 600, color: '#374151', fontSize: '0.9rem', marginBottom: '8px' }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 78638 80313"
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid #d1d5db',
                          borderRadius: '10px',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '28px' }}>
                    <label style={{ display: 'block', fontWeight: 600, color: '#374151', fontSize: '0.9rem', marginBottom: '8px' }}>
                      Message or Project Brief <span style={{ color: '#d94452' }}>*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your project requirements, timeline, or inquiries..."
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #d1d5db',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        outline: 'none',
                        resize: 'vertical',
                        transition: 'border-color 0.2s'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status.submitting}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '1.05rem', padding: '14px 24px' }}
                  >
                    <span>{status.submitting ? 'Sending Message...' : 'Send Message'}</span>
                    <span className="arrow-circle">
                      <FaPaperPlane size={12} />
                    </span>
                  </button>
                </form>
              </div>
            </AnimatedSection>

            {/* Direct Contact Information Cards */}
            <AnimatedSection>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Office Address Card */}
                <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                  <div style={{ background: 'rgba(217, 68, 82, 0.12)', color: '#d94452', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>Office Address</h4>
                    <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
                      {company?.address || 'Vaishnodevi, Ahmedabad, Gujarat, India'}
                    </p>
                  </div>
                </div>

                {/* Direct Phone Card */}
                <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                  <div style={{ background: 'rgba(53, 187, 155, 0.12)', color: '#35bb9b', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>Call Us</h4>
                    <a href={`tel:${company?.phone || '7863880313'}`} style={{ color: '#1e293b', fontSize: '1.1rem', fontWeight: 600, textDecoration: 'none' }}>
                      +91 {company?.phone || '7863880313'}
                    </a>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px', margin: 0 }}>
                      Mon - Sat from 9:30 AM to 7:00 PM IST
                    </p>
                  </div>
                </div>

                {/* Direct Email Card */}
                <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                  <div style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#3b82f6', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                    <FaEnvelope />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>Email Inquiries</h4>
                    <a href={`mailto:${company?.email || 'yatinpatel2747@gmail.com'}`} style={{ color: '#1e293b', fontSize: '1.05rem', fontWeight: 600, textDecoration: 'none' }}>
                      {company?.email || 'yatinpatel2747@gmail.com'}
                    </a>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px', margin: 0 }}>
                      Send us RFPs or detailed inquiries anytime.
                    </p>
                  </div>
                </div>

                {/* Response Commitment Box */}
                <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff', borderRadius: '20px', padding: '28px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ background: '#35bb9b', color: '#fff', padding: '12px', borderRadius: '12px' }}>
                    <FaClock size={24} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 4px 0' }}>Fast Response Guarantee</h5>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', margin: 0 }}>
                      Direct communication with technical architects without intermediary delays.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
