import React, { useEffect, useState, useCallback } from 'react';
import { FaPlus, FaBriefcase, FaExternalLinkAlt } from 'react-icons/fa';
import AdminDataTable from '../components/AdminDataTable';
import AdminModal from '../components/AdminModal';
import api from '../../config/api';

const emptyForm = {
  title: '',
  description: '',
  link: '',
  image: '',
};

export default function AdminPortfolio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchPortfolio = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/portfolio');
      const data = res.data?.data || res.data;
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch portfolio error:', err);
      setError('Could not load portfolio items.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setImageFile(null);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      title: item.title || '',
      description: item.description || '',
      link: item.link || '',
      image: item.image || '',
    });
    setImageFile(null);
    setError('');
    setModalOpen(true);
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete portfolio item "${item.title}"? This cannot be undone.`)) return;
    const itemId = item.id || item._id;
    try {
      await api.delete(`/api/admin/portfolio/${itemId}`);
      setSuccess('Portfolio item deleted successfully.');
      fetchPortfolio();
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Failed to delete portfolio item.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Project title is required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('link', form.link);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };

      if (editItem) {
        const editId = editItem.id || editItem._id;
        await api.put(`/api/admin/portfolio/${editId}`, formData, config);
        setSuccess('Portfolio item updated successfully.');
      } else {
        await api.post('/api/admin/portfolio', formData, config);
        setSuccess('Portfolio item created successfully.');
      }
      setModalOpen(false);
      fetchPortfolio();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save portfolio item.');
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      key: 'image',
      label: 'Preview',
      render: (val) =>
        val ? (
          <img
            src={val.startsWith('http') ? val : `http://localhost:5000${val}`}
            alt="Portfolio"
            style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 8 }}
          />
        ) : (
          <div
            style={{
              width: 44,
              height: 44,
              background: '#f1f5f9',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94a3b8',
            }}
          >
            <FaBriefcase />
          </div>
        ),
    },
    { key: 'title', label: 'Project Title' },
    { key: 'description', label: 'Description', truncate: true },
    {
      key: 'link',
      label: 'Live URL',
      render: (val) =>
        val ? (
          <a
            href={val}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              color: '#3b82f6',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Open <FaExternalLinkAlt size={10} />
          </a>
        ) : (
          '—'
        ),
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-header-title">Portfolio Management</h2>
          <p className="page-header-subtitle">
            Manage project case studies and showcase items (database ready for frontend display)
          </p>
        </div>
        <button type="button" className="btn btn-primary" onClick={openAdd}>
          <FaPlus /> Add Portfolio Item
        </button>
      </div>

      {success && <div className="alert alert-success">{success}</div>}
      {error && !modalOpen && <div className="alert alert-error">{error}</div>}

      <div className="table-card">
        <div className="table-header">
          <div>
            <div className="table-title">All Portfolio Items</div>
            <div className="table-subtitle">{items.length} items registered</div>
          </div>
          <FaBriefcase style={{ color: '#8b5cf6', fontSize: '1.2rem' }} />
        </div>
        <AdminDataTable
          columns={columns}
          data={items}
          onEdit={openEdit}
          onDelete={handleDelete}
          loading={loading}
          emptyMessage="No portfolio items added yet. Click '+ Add Portfolio Item' to add one."
        />
      </div>

      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
        footer={
          <>
            <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)} disabled={saving}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
              {saving ? 'Saving...' : editItem ? 'Update Item' : 'Create Item'}
            </button>
          </>
        }
      >
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">
              Project Title <span>*</span>
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="e.g. KrushiBill Billing Engine"
              value={form.title}
              onChange={handleChange}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label className="form-label">Project Description</label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Brief summary of the client challenge, architecture, and delivered impact..."
              value={form.description}
              onChange={handleChange}
              rows={3}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Project External Link URL</label>
            <input
              type="url"
              name="link"
              className="form-control"
              placeholder="https://example.com"
              value={form.link}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Project Screenshot / Cover Image</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
