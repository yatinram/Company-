import React, { useEffect, useState, useCallback } from 'react';
import { FaPlus, FaStar } from 'react-icons/fa';
import AdminDataTable from '../components/AdminDataTable';
import AdminModal from '../components/AdminModal';
import api from '../../config/api';

const emptyForm = {
  name: '',
  designation: '',
  company: '',
  review_text: '',
  photo_url: '',
};

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [photoFile, setPhotoFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/testimonials');
      const data = res.data?.data || res.data;
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch testimonials error:', err);
      setError('Could not load testimonials.');
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setPhotoFile(null);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      name: item.name || '',
      designation: item.designation || '',
      company: item.company || '',
      review_text: item.review_text || item.reviewText || '',
      photo_url: item.photo_url || item.photoUrl || '',
    });
    setPhotoFile(null);
    setError('');
    setModalOpen(true);
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete review from "${item.name}"? This cannot be undone.`)) return;
    const itemId = item.id || item._id;
    try {
      await api.delete(`/api/admin/testimonials/${itemId}`);
      setSuccess('Testimonial deleted successfully.');
      fetchTestimonials();
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Failed to delete testimonial.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.review_text.trim()) {
      setError('Client name and review text are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('designation', form.designation);
      formData.append('company', form.company);
      formData.append('review_text', form.review_text);
      if (photoFile) {
        formData.append('photo', photoFile);
      } else if (form.photo_url) {
        formData.append('photo_url', form.photo_url);
      }

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };

      if (editItem) {
        const editId = editItem.id || editItem._id;
        await api.put(`/api/admin/testimonials/${editId}`, formData, config);
        setSuccess('Testimonial updated successfully.');
      } else {
        await api.post('/api/admin/testimonials', formData, config);
        setSuccess('Testimonial created successfully.');
      }
      setModalOpen(false);
      fetchTestimonials();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save testimonial.');
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      key: 'photo_url',
      label: 'Photo',
      render: (val, row) => {
        const photo = val || row?.photoUrl;
        return photo ? (
          <img
            src={photo.startsWith('http') ? photo : `http://localhost:5000${photo}`}
            alt={row?.name || 'Client'}
            style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: '#f5ba45',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
            }}
          >
            {row?.name ? row.name.charAt(0).toUpperCase() : 'C'}
          </div>
        );
      },
    },
    { key: 'name', label: 'Client Name' },
    { key: 'designation', label: 'Designation' },
    { key: 'company', label: 'Company' },
    {
      key: 'review_text',
      label: 'Review Content',
      truncate: true,
      render: (val, row) => val || row?.reviewText || '—',
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-header-title">Client Testimonials</h2>
          <p className="page-header-subtitle">
            Manage customer feedback and success stories displayed on the homepage slider
          </p>
        </div>
        <button type="button" className="btn btn-primary" onClick={openAdd}>
          <FaPlus /> Add Testimonial
        </button>
      </div>

      {success && <div className="alert alert-success">{success}</div>}
      {error && !modalOpen && <div className="alert alert-error">{error}</div>}

      <div className="table-card">
        <div className="table-header">
          <div>
            <div className="table-title">All Testimonials</div>
            <div className="table-subtitle">{testimonials.length} reviews active</div>
          </div>
          <FaStar style={{ color: '#f5ba45', fontSize: '1.2rem' }} />
        </div>
        <AdminDataTable
          columns={columns}
          data={testimonials}
          onEdit={openEdit}
          onDelete={handleDelete}
          loading={loading}
          emptyMessage="No reviews found. Click '+ Add Testimonial' to add one."
        />
      </div>

      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? 'Edit Testimonial' : 'Add New Testimonial'}
        footer={
          <>
            <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)} disabled={saving}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
              {saving ? 'Saving...' : editItem ? 'Update Testimonial' : 'Create Testimonial'}
            </button>
          </>
        }
      >
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">
              Client Full Name <span>*</span>
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="e.g. Ravi Patel"
              value={form.name}
              onChange={handleChange}
              autoFocus
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Designation / Role</label>
              <input
                type="text"
                name="designation"
                className="form-control"
                placeholder="e.g. CEO / Founder"
                value={form.designation}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                name="company"
                className="form-control"
                placeholder="e.g. AgroFresh Distributors"
                value={form.company}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">
              Review Content <span>*</span>
            </label>
            <textarea
              name="review_text"
              className="form-control"
              placeholder="Write the testimonial message..."
              value={form.review_text}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Client Photo</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleFileChange}
              style={{ marginBottom: 8 }}
            />
            <input
              type="text"
              name="photo_url"
              className="form-control"
              placeholder="Or enter photo URL: https://example.com/avatar.jpg"
              value={form.photo_url}
              onChange={handleChange}
            />
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
