import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  MdPerson,
  MdLock,
  MdSave,
  MdVisibility,
  MdVisibilityOff,
  MdEmail,
  MdBadge,
  MdShield,
} from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import './Settings.css';

/* ─── Profile Section ─────────────────────────────────── */
const ProfileSection = () => {
  const { admin, updateAdmin } = useAuth();
  const [form, setForm] = useState({ name: admin?.name || '', email: admin?.email || '' });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error('Name and email are required');
      return;
    }
    setSaving(true);
    try {
      const res = await axios.put('/api/auth/profile', form);
      updateAdmin({ name: res.data.admin.name, email: res.data.admin.email });
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="settings-card">
      <div className="settings-card-header">
        <div className="settings-card-icon profile-icon">
          <MdPerson />
        </div>
        <div>
          <h3>Profile Information</h3>
          <p>Update your admin name and email address</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="settings-form">
        {/* Avatar preview */}
        <div className="avatar-row">
          <div className="settings-avatar">
            {admin?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="avatar-info">
            <p className="avatar-name">{admin?.name}</p>
            <p className="avatar-role">Super Administrator</p>
          </div>
        </div>

        <div className="settings-fields">
          <div className="settings-field">
            <label htmlFor="name">
              <MdBadge /> Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="settings-field">
            <label htmlFor="email">
              <MdEmail /> Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div className="settings-actions">
          <button type="submit" className="btn-save" disabled={saving}>
            {saving ? (
              <span className="btn-spinner" />
            ) : (
              <MdSave />
            )}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

/* ─── Password Section ────────────────────────────────── */
const PasswordSection = () => {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const toggleShow = (field) => setShow((p) => ({ ...p, [field]: !p[field] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      toast.error('All password fields are required');
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (form.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    setSaving(true);
    try {
      await axios.put('/api/auth/change-password', {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      toast.success('Password changed successfully!');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  const PasswordInput = ({ name, label, showKey }) => (
    <div className="settings-field">
      <label htmlFor={name}>
        <MdLock /> {label}
      </label>
      <div className="pass-input-wrap">
        <input
          id={name}
          name={name}
          type={show[showKey] ? 'text' : 'password'}
          value={form[name]}
          onChange={handleChange}
          placeholder={`Enter ${label.toLowerCase()}`}
          required
        />
        <button
          type="button"
          className="pass-toggle"
          onClick={() => toggleShow(showKey)}
          aria-label="Toggle visibility"
        >
          {show[showKey] ? <MdVisibilityOff /> : <MdVisibility />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="settings-card">
      <div className="settings-card-header">
        <div className="settings-card-icon password-icon">
          <MdShield />
        </div>
        <div>
          <h3>Change Password</h3>
          <p>Keep your account secure with a strong password</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-fields">
          <PasswordInput name="currentPassword" label="Current Password" showKey="current" />
          <PasswordInput name="newPassword" label="New Password" showKey="new" />
          <PasswordInput name="confirmPassword" label="Confirm New Password" showKey="confirm" />
        </div>

        {/* Strength hint */}
        {form.newPassword && (
          <div className="password-hints">
            <StrengthHint ok={form.newPassword.length >= 6} label="At least 6 characters" />
            <StrengthHint ok={/[A-Z]/.test(form.newPassword)} label="One uppercase letter" />
            <StrengthHint ok={/[0-9]/.test(form.newPassword)} label="One number" />
            <StrengthHint
              ok={form.newPassword === form.confirmPassword && form.confirmPassword !== ''}
              label="Passwords match"
            />
          </div>
        )}

        <div className="settings-actions">
          <button type="submit" className="btn-save" disabled={saving}>
            {saving ? <span className="btn-spinner" /> : <MdLock />}
            {saving ? 'Changing...' : 'Change Password'}
          </button>
        </div>
      </form>
    </div>
  );
};

const StrengthHint = ({ ok, label }) => (
  <div className={`hint-item ${ok ? 'hint-ok' : 'hint-no'}`}>
    <span className="hint-dot">{ok ? '✓' : '○'}</span>
    {label}
  </div>
);

/* ─── Account Info Section ────────────────────────────── */
const AccountInfoSection = () => {
  const { admin } = useAuth();

  return (
    <div className="settings-card info-only">
      <div className="settings-card-header">
        <div className="settings-card-icon info-icon">
          <MdBadge />
        </div>
        <div>
          <h3>Account Details</h3>
          <p>Your current account information</p>
        </div>
      </div>
      <div className="account-info-grid">
        <div className="account-info-item">
          <span className="info-label">Account ID</span>
          <span className="info-val mono">{admin?._id || '—'}</span>
        </div>
        <div className="account-info-item">
          <span className="info-label">Role</span>
          <span className="info-val">
            <span className="role-badge">Super Admin</span>
          </span>
        </div>
        <div className="account-info-item">
          <span className="info-label">Created</span>
          <span className="info-val">
            {admin?.createdAt
              ? new Date(admin.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })
              : '—'}
          </span>
        </div>
        <div className="account-info-item">
          <span className="info-label">Last Updated</span>
          <span className="info-val">
            {admin?.updatedAt
              ? new Date(admin.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })
              : '—'}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Settings Page ──────────────────────────────── */
const Settings = () => {
  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your admin account preferences</p>
      </div>

      <div className="settings-grid">
        <div className="settings-main">
          <ProfileSection />
          <PasswordSection />
        </div>
        <div className="settings-side">
          <AccountInfoSection />
        </div>
      </div>
    </div>
  );
};

export default Settings;
