import React, { useEffect, useState, useCallback } from 'react';
import { FaBuilding, FaSave, FaShareAlt, FaCheckCircle } from 'react-icons/fa';
import api from '../../config/api';

export default function AdminCompanySettings() {
  const [form, setForm] = useState({
    company_name: 'Aventrix Solutions',
    address: 'Vaishnodevi, Ahmedabad',
    phone: '7863880313',
    email: 'yatinpatel2747@gmail.com',
    favicon_url: '',
    social_links: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/company-settings');
      const d = res.data?.data || res.data;
      if (d) {
        setForm({
          company_name: d.company_name || d.name || 'Aventrix Solutions',
          address: d.address || 'Vaishnodevi, Ahmedabad',
          phone: d.phone || '7863880313',
          email: d.email || 'yatinpatel2747@gmail.com',
          favicon_url: d.favicon_url || d.faviconUrl || '',
          social_links: {
            facebook: d.social_links?.facebook || '',
            twitter: d.social_links?.twitter || '',
            linkedin: d.social_links?.linkedin || '',
            instagram: d.social_links?.instagram || '',
          },
        });
      }
    } catch (err) {
      console.warn('Fetch settings warning:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      social_links: { ...prev.social_links, [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await api.put('/api/admin/company-settings', form);
      setSuccess('Company settings successfully updated! Changes are live across the public website.');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update company settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-header-title">Company Settings</h2>
          <p className="page-header-subtitle">
            Centralized company profile settings stored in MySQL. Edits here update the public site live.
          </p>
        </div>
      </div>

      {success && (
        <div className="alert alert-success">
          <FaCheckCircle style={{ flexShrink: 0 }} />
          <span>{success}</span>
        </div>
      )}
      {error && <div className="alert alert-error">{error}</div>}

      <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: '32px', maxWidth: '820px' }}>
        <form onSubmit={handleSubmit}>
          {/* General Company Information */}
          <div style={{ marginBottom: '32px' }}>
            <h3
              style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#1e293b',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <FaBuilding style={{ color: '#d94452' }} /> General Business Profile
            </h3>

            <div className="form-group">
              <label className="form-label">Company Brand Name</label>
              <input
                type="text"
                name="company_name"
                className="form-control"
                value={form.company_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Headquarters / Office Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Primary Contact Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Primary Business Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Favicon / Geometric "V" Monogram URL</label>
              <input
                type="text"
                name="favicon_url"
                className="form-control"
                placeholder="/favicon.ico or https://example.com/logo.png"
                value={form.favicon_url}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Social Profiles */}
          <div style={{ marginBottom: '32px', borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
            <h3
              style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#1e293b',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <FaShareAlt style={{ color: '#35bb9b' }} /> Social Media Handles
            </h3>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">LinkedIn Profile URL</label>
                <input
                  type="url"
                  name="linkedin"
                  className="form-control"
                  placeholder="https://linkedin.com/company/aventrix-solutions"
                  value={form.social_links.linkedin}
                  onChange={handleSocialChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Twitter / X URL</label>
                <input
                  type="url"
                  name="twitter"
                  className="form-control"
                  placeholder="https://x.com/aventrixsolutions"
                  value={form.social_links.twitter}
                  onChange={handleSocialChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Facebook URL</label>
                <input
                  type="url"
                  name="facebook"
                  className="form-control"
                  placeholder="https://facebook.com/aventrixsolutions"
                  value={form.social_links.facebook}
                  onChange={handleSocialChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Instagram URL</label>
                <input
                  type="url"
                  name="instagram"
                  className="form-control"
                  placeholder="https://instagram.com/aventrixsolutions"
                  value={form.social_links.instagram}
                  onChange={handleSocialChange}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
              style={{ padding: '12px 28px', fontSize: '1rem' }}
            >
              <FaSave /> {saving ? 'Saving...' : 'Save Settings to Database'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
