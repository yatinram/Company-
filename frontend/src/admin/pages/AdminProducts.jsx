import React, { useEffect, useState, useCallback } from 'react';
import { FaPlus, FaBox, FaSeedling } from 'react-icons/fa';
import AdminDataTable from '../components/AdminDataTable';
import AdminModal from '../components/AdminModal';
import api from '../../config/api';

const emptyForm = {
  name: '',
  slug: '',
  description: '',
  features: '',
  modules: '',
  image: '',
};

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/products');
      const data = res.data?.data || res.data;
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch products error:', err);
      setError('Could not load products from backend.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      name: item.name || '',
      slug: item.slug || '',
      description: item.description || '',
      features: Array.isArray(item.features) ? item.features.join('\n') : item.features || '',
      modules: Array.isArray(item.modules) ? item.modules.join('\n') : item.modules || '',
      image: item.image || '',
    });
    setError('');
    setModalOpen(true);
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete product "${item.name}"? This cannot be undone.`)) return;
    const itemId = item.id || item._id;
    try {
      await api.delete(`/api/admin/products/${itemId}`);
      setSuccess('Product deleted successfully.');
      fetchProducts();
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Failed to delete product.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setForm((prev) => ({ ...prev, name: value, slug: slugify(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Product name is required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = {
        name: form.name,
        slug: form.slug || slugify(form.name),
        description: form.description,
        features: form.features
          ? form.features.split('\n').map((f) => f.trim()).filter(Boolean)
          : [],
        modules: form.modules
          ? form.modules.split('\n').map((m) => m.trim()).filter(Boolean)
          : [],
        image: form.image,
      };

      if (editItem) {
        const editId = editItem.id || editItem._id;
        await api.put(`/api/admin/products/${editId}`, payload);
        setSuccess('Product updated successfully.');
      } else {
        await api.post('/api/admin/products', payload);
        setSuccess('Product created successfully.');
      }
      setModalOpen(false);
      fetchProducts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product.');
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    { key: 'name', label: 'Product Name' },
    {
      key: 'slug',
      label: 'Slug URL',
      render: (val) => (
        <code style={{ fontSize: '0.8rem', background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>
          {val || '—'}
        </code>
      ),
    },
    { key: 'description', label: 'Description', truncate: true },
    {
      key: 'features',
      label: 'Features Count',
      render: (val) => (
        <span className="badge badge-teal">
          {Array.isArray(val) ? val.length : 0} features
        </span>
      ),
    },
    {
      key: 'modules',
      label: 'Modules Count',
      render: (val) => (
        <span className="badge badge-blue">
          {Array.isArray(val) ? val.length : 0} modules
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-header-title">Products Management</h2>
          <p className="page-header-subtitle">Manage proprietary software products like KrushiBill ERP</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={openAdd}>
          <FaPlus /> Add New Product
        </button>
      </div>

      {success && <div className="alert alert-success">{success}</div>}
      {error && !modalOpen && <div className="alert alert-error">{error}</div>}

      <div className="table-card">
        <div className="table-header">
          <div>
            <div className="table-title">Software Catalog</div>
            <div className="table-subtitle">{products.length} products in database</div>
          </div>
          <FaBox style={{ color: '#35bb9b', fontSize: '1.2rem' }} />
        </div>
        <AdminDataTable
          columns={columns}
          data={products}
          onEdit={openEdit}
          onDelete={handleDelete}
          loading={loading}
          emptyMessage="No products configured yet."
        />
      </div>

      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? 'Edit Product' : 'Add New Product'}
        size="lg"
        footer={
          <>
            <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)} disabled={saving}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
              {saving ? 'Saving...' : editItem ? 'Update Product' : 'Create Product'}
            </button>
          </>
        }
      >
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Product Name <span>*</span>
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="e.g. KrushiBill ERP"
                value={form.name}
                onChange={handleChange}
                autoFocus
              />
            </div>
            <div className="form-group">
              <label className="form-label">URL Slug</label>
              <input
                type="text"
                name="slug"
                className="form-control"
                placeholder="krushibill-erp"
                value={form.slug}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Describe the software product, target audience, and primary benefits..."
              value={form.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Features List (1 per line)</label>
              <textarea
                name="features"
                className="form-control"
                placeholder="GST Billing with print&#10;Inventory batch tracking&#10;Farmer ledger management"
                value={form.features}
                onChange={handleChange}
                rows={5}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Modules Covered (1 per line)</label>
              <textarea
                name="modules"
                className="form-control"
                placeholder="Dashboard&#10;New Billing&#10;Bill History&#10;Sales Return&#10;Farmers&#10;Stock Management"
                value={form.modules}
                onChange={handleChange}
                rows={5}
              />
            </div>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
