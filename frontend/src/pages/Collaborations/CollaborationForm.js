import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import PageHeader from '../../components/shared/PageHeader';
import '../Careers/Form.css';

const CollaborationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    partnerName: '',
    description: '',
    logo: '',
    website: '',
    type: 'Business',
    startDate: '',
    isActive: true,
    order: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      axios.get(`/api/collaborations/${id}`).then((res) => {
        const d = res.data;
        setForm({ ...d, startDate: d.startDate ? d.startDate.split('T')[0] : '' });
      }).catch(() => toast.error('Failed to load collaboration'));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await axios.put(`/api/collaborations/${id}`, form);
        toast.success('Collaboration updated!');
      } else {
        await axios.post('/api/collaborations', form);
        toast.success('Collaboration added!');
      }
      navigate('/collaborations');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title={isEdit ? 'Edit Collaboration' : 'Add New Collaboration'}
        subtitle="Manage company partnerships"
        showBack
      />
      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-section">
          <h3>Partner Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Partner Name *</label>
              <input name="partnerName" value={form.partnerName} onChange={handleChange} required placeholder="e.g. Tech Corp Inc." />
            </div>
            <div className="form-group">
              <label>Partnership Type</label>
              <select name="type" value={form.type} onChange={handleChange}>
                {['Technology', 'Business', 'Research', 'NGO', 'Government', 'Other'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Logo URL</label>
              <input name="logo" value={form.logo} onChange={handleChange} placeholder="https://..." />
            </div>
            <div className="form-group">
              <label>Website</label>
              <input name="website" value={form.website} onChange={handleChange} placeholder="https://partner.com" />
            </div>
            <div className="form-group">
              <label>Partnership Start Date</label>
              <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Display Order</label>
              <input type="number" name="order" value={form.order} onChange={handleChange} min="0" />
            </div>
            <div className="form-group full-width">
              <label>Description *</label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows={5} placeholder="Describe the partnership..." />
            </div>
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
          <button type="button" className="btn-secondary" onClick={() => navigate('/collaborations')}>Cancel</button>
          <button type="submit" className="btn-primary-form" disabled={loading}>
            {loading ? 'Saving...' : isEdit ? 'Update Partner' : 'Add Partner'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CollaborationForm;
