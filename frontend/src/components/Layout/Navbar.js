import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdMenu, MdNotifications, MdLogout, MdSettings } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const pageTitles = {
  '/dashboard':      'Dashboard',
  '/careers':        'Career Listings',
  '/services':       'Services',
  '/platforms':      'Platforms',
  '/collaborations': 'Collaborations',
  '/settings':       'Settings',
};

const Navbar = ({ toggleSidebar }) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate('/login');
  };

  const handleSettings = () => {
    setDropdownOpen(false);
    navigate('/settings');
  };

  const pageTitle =
    Object.entries(pageTitles).find(([key]) =>
      location.pathname.startsWith(key)
    )?.[1] || 'Admin Panel';

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="menu-btn" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <MdMenu />
        </button>
        <div className="navbar-title">
          <h2>{pageTitle}</h2>
        </div>
      </div>

      <div className="navbar-right">
        <button className="nav-icon-btn" aria-label="Notifications">
          <MdNotifications />
          <span className="notif-badge">3</span>
        </button>

        <div className="profile-wrapper">
          <button
            className="profile-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-label="Profile menu"
          >
            <div className="nav-avatar">
              {admin?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="profile-info">
              <span className="profile-name">{admin?.name || 'Admin'}</span>
              <span className="profile-role">Administrator</span>
            </div>
          </button>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-user">
                <div className="dropdown-avatar">
                  {admin?.name?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div className="dropdown-user-info">
                  <p className="dropdown-name">{admin?.name || 'Admin'}</p>
                  <p className="dropdown-email">{admin?.email}</p>
                </div>
              </div>
              <div className="dropdown-divider" />
              <button className="dropdown-item" onClick={handleSettings}>
                <MdSettings />
                <span>Settings</span>
              </button>
              <button className="dropdown-item danger" onClick={handleLogout}>
                <MdLogout />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {dropdownOpen && (
        <div className="dropdown-overlay" onClick={() => setDropdownOpen(false)} />
      )}
    </header>
  );
};

export default Navbar;
