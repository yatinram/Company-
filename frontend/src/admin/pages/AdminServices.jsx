import React, { useEffect, useState, useCallback } from 'react';
import { FaPlus, FaCog } from 'react-icons/fa';
import AdminDataTable from '../components/AdminDataTable';
import AdminModal from '../components/AdminModal';
import api from '../../config/api';

const emptyForm = {
  title: '',
  description: '',
  icon: '',
  display_order: 0,
};

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/services');
      const data = res.data?.data || res.data;
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch services error:', err);
      setError('Could not load services from backend.');
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      title: item.title || '',
      description: item.description || '',
      icon: item.icon || '',
      display_order: item.display_order ?? item.displayOrder ?? 0,
    });
    setError('');
    setModalOpen(true);
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete service "${item.title}"? This cannot be undone.`)) return;
    const itemId = item.id || item._id;
    try {
      await api.delete(`/api/admin/services/${itemId}`);
      setSuccess('Service deleted successfully.');
      fetchServices();
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Failed to delete service.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Title is required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = {
        title: form.title,
        description: form.description,
        icon: form.icon,
        display_order: Number(form.display_order) || 0,
      };

      if (editItem) {
        const editId = editItem.id || editItem._id;
        await api.put(`/api/admin/services/${editId}`, payload);
        setSuccess('Service updated successfully.');
      } else {
        await api.post('/api/admin/services', payload);
        setSuccess('Service created successfully.');
      }
      setModalOpen(false);
      fetchServices();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save service.');
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      key: 'display_order',
      label: 'Order',
      render: (val, row) => (
        <span className="badge badge-gray">{val ?? row?.displayOrder ?? 0}</span>
      ),
    },
    {
      key: 'icon',
      label: 'Icon Identifier',
      render: (val) => (
        <code style={{ fontSize: '0.8rem', background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>
          {val || '—'}
        </code>
      ),
    },
    { key: 'title', label: 'Service Title' },
    { key: 'description', label: 'Description', truncate: true },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-header-title">Services Management</h2>
          <p className="page-header-subtitle">Add, edit, or reorder services shown on the public site</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={openAdd}>
          <FaPlus /> Add New Service
        </button>
      </div>

      {success && <div className="alert alert-success">{success}</div>}
      {error && !modalOpen && <div className="alert alert-error">{error}</div>}

      <div className="table-card">
        <div className="table-header">
          <div>
            <div className="table-title">All Services</div>
            <div className="table-subtitle">{services.length} services configured</div>
          </div>
          <FaCog style={{ color: '#d94452', fontSize: '1.2rem' }} />
        </div>
        <AdminDataTable
          columns={columns}
          data={services}
          onEdit={openEdit}
          onDelete={handleDelete}
          loading={loading}
          emptyMessage="No services found. Click '+ Add New Service' above to add your first service."
        />
      </div>

      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? 'Edit Service' : 'Add New Service'}
        footer={
          <>
            <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)} disabled={saving}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
              {saving ? 'Saving...' : editItem ? 'Update Service' : 'Create Service'}
            </button>
          </>
        }
      >
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">
              Service Title <span>*</span>
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="e.g. Website Development"
              value={form.title}
              onChange={handleChange}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Describe this service..."
              value={form.description}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Icon Name (react-icons)</label>
              <input
                type="text"
                name="icon"
                className="form-control"
                placeholder="e.g. FaGlobe, FaMobileAlt, FaCode, FaRobot, FaComments"
                value={form.icon}
                onChange={handleChange}
              />
              <div className="form-hint">Icon string: FaGlobe, FaMobileAlt, FaCode, FaRobot, FaComments</div>
            </div>
            <div className="form-group">
              <label className="form-label">Display Order</label>
              <input
                type="number"
                name="display_order"
                className="form-control"
                placeholder="0"
                value={form.display_order}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
