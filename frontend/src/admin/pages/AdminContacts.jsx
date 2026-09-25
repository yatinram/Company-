import React, { useEffect, useState, useCallback } from 'react';
import { FaEnvelope, FaUser, FaPhone, FaCalendarAlt, FaEye } from 'react-icons/fa';
import AdminDataTable from '../components/AdminDataTable';
import AdminModal from '../components/AdminModal';
import api from '../../config/api';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/contacts');
      const data = res.data?.data || res.data;
      setContacts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch contacts error:', err);
      setError('Could not load contact inquiries.');
      setContacts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const viewDetails = (item) => {
    setSelectedContact(item);
    setModalOpen(true);
  };

  const columns = [
    { key: 'name', label: 'Contact Name' },
    {
      key: 'email',
      label: 'Email Address',
      render: (val) => (
        <a href={`mailto:${val}`} style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 500 }}>
          {val}
        </a>
      ),
    },
    {
      key: 'phone',
      label: 'Phone Number',
      render: (val) => val || '—',
    },
    { key: 'message', label: 'Message Brief', truncate: true },
    {
      key: 'createdAt',
      label: 'Received At',
      render: (val) =>
        val
          ? new Date(val).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          : '—',
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-header-title">Contact Inquiries & Leads</h2>
          <p className="page-header-subtitle">
            Customer inquiries and demo requests received from the public website contact form
          </p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="table-card">
        <div className="table-header">
          <div>
            <div className="table-title">Received Messages</div>
            <div className="table-subtitle">{contacts.length} total inquiries logged</div>
          </div>
          <FaEnvelope style={{ color: '#3b82f6', fontSize: '1.2rem' }} />
        </div>
        <AdminDataTable
          columns={columns}
          data={contacts}
          onEdit={viewDetails}
          loading={loading}
          emptyMessage="No contact inquiries received yet."
        />
      </div>

      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Inquiry Full Details"
        footer={
          <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>
            Close
          </button>
        }
      >
        {selectedContact && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                paddingBottom: '16px',
                borderBottom: '1px solid #f1f5f9',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(59, 130, 246, 0.1)',
                  color: '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                }}
              >
                <FaUser />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.15rem', color: '#1e293b' }}>
                  {selectedContact.name}
                </h4>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  {selectedContact.createdAt ? new Date(selectedContact.createdAt).toLocaleString() : ''}
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
                  Email Address
                </span>
                <p style={{ margin: '4px 0 0 0', fontWeight: 600 }}>
                  <a href={`mailto:${selectedContact.email}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
                    {selectedContact.email}
                  </a>
                </p>
              </div>

              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
                  Phone Number
                </span>
                <p style={{ margin: '4px 0 0 0', fontWeight: 600, color: '#1e293b' }}>
                  {selectedContact.phone || 'Not provided'}
                </p>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
                Message Content
              </span>
              <p style={{ margin: '8px 0 0 0', color: '#334155', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {selectedContact.message}
              </p>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
