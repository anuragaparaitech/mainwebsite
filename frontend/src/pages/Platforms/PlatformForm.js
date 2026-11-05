import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdAdd, MdClose } from 'react-icons/md';
import PageHeader from '../../components/shared/PageHeader';
import '../Careers/Form.css';

const PlatformForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: '',
    description: '',
    shortDescription: '',
    logo: '',
    url: '',
    techStack: [],
    features: [],
    isActive: true,
    order: 0,
  });
  const [newTech, setNewTech] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      axios.get(`/api/platforms/${id}`).then((res) => setForm(res.data))
        .catch(() => toast.error('Failed to load platform'));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const addItem = (field, value, setter) => {
    if (!value.trim()) return;
    setForm((prev) => ({ ...prev, [field]: [...prev[field], value.trim()] }));
    setter('');
  };

  const removeItem = (field, i) => {
    setForm((prev) => ({ ...prev, [field]: prev[field].filter((_, idx) => idx !== i) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await axios.put(`/api/platforms/${id}`, form);
        toast.success('Platform updated!');
      } else {
        await axios.post('/api/platforms', form);
        toast.success('Platform created!');
      }
      navigate('/platforms');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title={isEdit ? 'Edit Platform' : 'Add New Platform'}
        subtitle="Configure platform details"
        showBack
      />
      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-section">
          <h3>Platform Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Platform Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. CloudDash" />
            </div>
            <div className="form-group">
              <label>Logo URL</label>
              <input name="logo" value={form.logo} onChange={handleChange} placeholder="https://..." />
            </div>
            <div className="form-group">
              <label>Platform URL</label>
              <input name="url" value={form.url} onChange={handleChange} placeholder="https://platform.com" />
            </div>
            <div className="form-group">
              <label>Display Order</label>
              <input type="number" name="order" value={form.order} onChange={handleChange} min="0" />
            </div>
            <div className="form-group full-width">
              <label>Short Description</label>
              <input name="shortDescription" value={form.shortDescription} onChange={handleChange} placeholder="One-line summary" />
            </div>
            <div className="form-group full-width">
              <label>Full Description *</label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows={5} placeholder="Detailed platform description..." />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Tech Stack</h3>
          <div className="tag-input-wrapper">
            <input value={newTech} onChange={(e) => setNewTech(e.target.value)} placeholder="Add technology..."
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('techStack', newTech, setNewTech))} />
            <button type="button" className="tag-add-btn" onClick={() => addItem('techStack', newTech, setNewTech)}><MdAdd /></button>
          </div>
          <div className="tags-list">
            {form.techStack.map((t, i) => (
              <span key={i} className="tag">{t} <button type="button" onClick={() => removeItem('techStack', i)}><MdClose /></button></span>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3>Key Features</h3>
          <div className="tag-input-wrapper">
            <input value={newFeature} onChange={(e) => setNewFeature(e.target.value)} placeholder="Add a feature..."
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('features', newFeature, setNewFeature))} />
            <button type="button" className="tag-add-btn" onClick={() => addItem('features', newFeature, setNewFeature)}><MdAdd /></button>
          </div>
          <div className="tags-list">
            {form.features.map((f, i) => (
              <span key={i} className="tag">{f} <button type="button" onClick={() => removeItem('features', i)}><MdClose /></button></span>
            ))}
          </div>
        </div>

        <div className="form-section">
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
              <span>Active (visible on website)</span>
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate('/platforms')}>Cancel</button>
          <button type="submit" className="btn-primary-form" disabled={loading}>
            {loading ? 'Saving...' : isEdit ? 'Update Platform' : 'Add Platform'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlatformForm;
