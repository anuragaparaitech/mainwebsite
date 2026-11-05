import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const { login }   = useAuth();
  const navigate    = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* ── Left branding panel ── */}
      <div className="login-left">
        <div className="login-branding">
          <div className="brand-logo">A</div>
          <h2>Company Admin Panel</h2>
          <p>Manage your company website content with ease</p>
          <div className="feature-list">
            {[
              'Careers Management',
              'Services Control',
              'Platform Settings',
              'Collaboration Hub',
            ].map((f) => (
              <div key={f} className="feature-item">
                <span className="feature-dot" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="login-right">
        <div className="login-card">

          <div className="login-header">
            <div className="login-logo">A</div>
            <h1>Welcome back</h1>
            <p>Sign in to your admin account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Admin Email</label>
              <input
                id="email"
                type="email"
                placeholder="admin@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="pass-wrap">
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-pass"
                  onClick={() => setShowPass(!showPass)}
                  aria-label="Toggle password visibility"
                >
                  {showPass ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? <span className="btn-spinner" /> : 'Sign In'}
            </button>
          </form>

          <p className="login-footer">
            Protected admin area · Unauthorized access is prohibited
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;
