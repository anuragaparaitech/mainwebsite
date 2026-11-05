import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdAdd, MdClose } from 'react-icons/md';
import PageHeader from '../../components/shared/PageHeader';
import './Form.css';

const CareerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: [],
    responsibilities: [],
    salaryRange: '',
    isActive: true,
    deadline: '',
  });
  const [newReq, setNewReq] = useState('');
  const [newRes, setNewRes] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      axios.get(`/api/careers/${id}`).then((res) => {
        const d = res.data;
        setForm({
          ...d,
          deadline: d.deadline ? d.deadline.split('T')[0] : '',
        });
      }).catch(() => toast.error('Failed to load career'));
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

  const removeItem = (field, index) => {
    setForm((prev) => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await axios.put(`/api/careers/${id}`, form);
        toast.success('Career updated!');
      } else {
        await axios.post('/api/careers', form);
        toast.success('Career created!');
      }
      navigate('/careers');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title={isEdit ? 'Edit Career' : 'Post New Job'}
        subtitle={isEdit ? 'Update the job listing details' : 'Create a new job posting'}
        showBack
      />

      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Job Title *</label>
              <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Senior React Developer" />
            </div>
            <div className="form-group">
              <label>Department *</label>
              <input name="department" value={form.department} onChange={handleChange} required placeholder="e.g. Engineering" />
            </div>
            <div className="form-group">
              <label>Location *</label>
              <input name="location" value={form.location} onChange={handleChange} required placeholder="e.g. Remote / New York" />
            </div>
            <div className="form-group">
              <label>Job Type</label>
              <select name="type" value={form.type} onChange={handleChange}>
                {['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Salary Range</label>
              <input name="salaryRange" value={form.salaryRange} onChange={handleChange} placeholder="e.g. $80,000 - $120,000" />
            </div>
            <div className="form-group">
              <label>Application Deadline</label>
              <input type="date" name="deadline" value={form.deadline} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Job Description</h3>
          <div className="form-group full-width">
            <label>Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={5} placeholder="Describe the role and responsibilities..." />
          </div>
        </div>

        <div className="form-section">
          <h3>Requirements</h3>
          <div className="tag-input-wrapper">
            <input value={newReq} onChange={(e) => setNewReq(e.target.value)} placeholder="Add a requirement and press +" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('requirements', newReq, setNewReq))} />
            <button type="button" className="tag-add-btn" onClick={() => addItem('requirements', newReq, setNewReq)}><MdAdd /></button>
          </div>
          <div className="tags-list">
            {form.requirements.map((r, i) => (
              <span key={i} className="tag">
                {r} <button type="button" onClick={() => removeItem('requirements', i)}><MdClose /></button>
              </span>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3>Responsibilities</h3>
          <div className="tag-input-wrapper">
            <input value={newRes} onChange={(e) => setNewRes(e.target.value)} placeholder="Add a responsibility and press +" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('responsibilities', newRes, setNewRes))} />
            <button type="button" className="tag-add-btn" onClick={() => addItem('responsibilities', newRes, setNewRes)}><MdAdd /></button>
          </div>
          <div className="tags-list">
            {form.responsibilities.map((r, i) => (
              <span key={i} className="tag">
                {r} <button type="button" onClick={() => removeItem('responsibilities', i)}><MdClose /></button>
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
          <button type="button" className="btn-secondary" onClick={() => navigate('/careers')}>Cancel</button>
          <button type="submit" className="btn-primary-form" disabled={loading}>
            {loading ? 'Saving...' : isEdit ? 'Update Career' : 'Post Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CareerForm;
