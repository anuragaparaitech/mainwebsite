import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdAdd, MdClose } from 'react-icons/md';
import PageHeader from '../../components/shared/PageHeader';
import '../Careers/Form.css';

const ServiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    description: '',
    shortDescription: '',
    icon: '',
    image: '',
    features: [],
    isActive: true,
    order: 0,
  });
  const [newFeature, setNewFeature] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      axios.get(`/api/services/${id}`).then((res) => setForm(res.data))
        .catch(() => toast.error('Failed to load service'));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setForm((prev) => ({ ...prev, features: [...prev.features, newFeature.trim()] }));
    setNewFeature('');
  };

  const removeFeature = (i) => {
    setForm((prev) => ({ ...prev, features: prev.features.filter((_, idx) => idx !== i) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await axios.put(`/api/services/${id}`, form);
        toast.success('Service updated!');
      } else {
        await axios.post('/api/services', form);
        toast.success('Service created!');
      }
      navigate('/services');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title={isEdit ? 'Edit Service' : 'Add New Service'}
        subtitle="Configure service details for the website"
        showBack
      />
      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-section">
          <h3>Service Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Service Title *</label>
              <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Web Development" />
            </div>
            <div className="form-group">
              <label>Icon (emoji or icon name)</label>
              <input name="icon" value={form.icon} onChange={handleChange} placeholder="e.g. 💻 or code" />
            </div>
            <div className="form-group">
              <label>Display Order</label>
              <input type="number" name="order" value={form.order} onChange={handleChange} min="0" />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
            </div>
            <div className="form-group full-width">
              <label>Short Description</label>
              <input name="shortDescription" value={form.shortDescription} onChange={handleChange} placeholder="Brief one-line description" />
            </div>
            <div className="form-group full-width">
              <label>Full Description *</label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows={5} placeholder="Detailed service description..." />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Features</h3>
          <div className="tag-input-wrapper">
            <input value={newFeature} onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Add a feature..."
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())} />
            <button type="button" className="tag-add-btn" onClick={addFeature}><MdAdd /></button>
          </div>
          <div className="tags-list">
            {form.features.map((f, i) => (
              <span key={i} className="tag">
                {f} <button type="button" onClick={() => removeFeature(i)}><MdClose /></button>
              </span>
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
          <button type="button" className="btn-secondary" onClick={() => navigate('/services')}>Cancel</button>
          <button type="submit" className="btn-primary-form" disabled={loading}>
            {loading ? 'Saving...' : isEdit ? 'Update Service' : 'Add Service'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
