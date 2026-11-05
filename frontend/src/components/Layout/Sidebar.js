import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  MdDashboard,
  MdWork,
  MdBuildCircle,
  MdDevices,
  MdHandshake,
  MdSettings,
  MdClose,
} from 'react-icons/md';
import './Sidebar.css';

const navItems = [
  { path: '/dashboard',      label: 'Dashboard',      icon: <MdDashboard /> },
  { path: '/careers',        label: 'Careers',        icon: <MdWork /> },
  { path: '/services',       label: 'Services',       icon: <MdBuildCircle /> },
  { path: '/platforms',      label: 'Platforms',      icon: <MdDevices /> },
  { path: '/collaborations', label: 'Collaborations', icon: <MdHandshake /> },
];

const bottomItems = [
  { path: '/settings', label: 'Settings', icon: <MdSettings /> },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="brand-icon">A</div>
          <span className="brand-name">AdminPanel</span>
        </div>
        <button
          className="sidebar-close"
          onClick={() => setIsOpen(false)}
          aria-label="Close sidebar"
        >
          <MdClose />
        </button>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        <p className="nav-group-label">MAIN MENU</p>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom nav (Settings) */}
      <div className="sidebar-bottom-nav">
        <div className="sidebar-divider" />
        {bottomItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <p className="sidebar-version">Company Admin &nbsp;v1.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
