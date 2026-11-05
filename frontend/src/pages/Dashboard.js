import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  MdWork,
  MdBuildCircle,
  MdDevices,
  MdHandshake,
  MdTrendingUp,
} from 'react-icons/md';
import './Dashboard.css';

const StatCard = ({ icon, label, count, color, bg }) => (
  <div className="stat-card">
    <div className="stat-icon" style={{ background: bg, color }}>
      {icon}
    </div>
    <div className="stat-info">
      <h3>{count}</h3>
      <p>{label}</p>
    </div>
    <MdTrendingUp className="stat-trend" style={{ color }} />
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ careers: 0, services: 0, platforms: 0, collaborations: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [c, s, p, col] = await Promise.all([
          axios.get('/api/careers'),
          axios.get('/api/services'),
          axios.get('/api/platforms'),
          axios.get('/api/collaborations'),
        ]);
        setStats({
          careers: c.data.length,
          services: s.data.length,
          platforms: p.data.length,
          collaborations: col.data.length,
        });
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    {
      label: 'Career Listings',
      count: stats.careers,
      icon: <MdWork />,
      color: '#6366f1',
      bg: '#e0e7ff',
    },
    {
      label: 'Services',
      count: stats.services,
      icon: <MdBuildCircle />,
      color: '#06b6d4',
      bg: '#cffafe',
    },
    {
      label: 'Platforms',
      count: stats.platforms,
      icon: <MdDevices />,
      color: '#10b981',
      bg: '#d1fae5',
    },
    {
      label: 'Collaborations',
      count: stats.collaborations,
      icon: <MdHandshake />,
      color: '#f59e0b',
      bg: '#fef3c7',
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Overview of your company website content</p>
      </div>

      {loading ? (
        <div className="dash-loading">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          <div className="stats-grid">
            {cards.map((card) => (
              <StatCard key={card.label} {...card} />
            ))}
          </div>

          <div className="dashboard-bottom">
            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="actions-grid">
                {[
                  { label: 'Post New Job', path: '/careers/new', icon: <MdWork />, color: '#4338ca' },
                  { label: 'Add Service', path: '/services/new', icon: <MdBuildCircle />, color: '#0e7490' },
                  { label: 'Add Platform', path: '/platforms/new', icon: <MdDevices />, color: '#065f46' },
                  { label: 'Add Partner', path: '/collaborations/new', icon: <MdHandshake />, color: '#92400e' },
                ].map((action) => (
                  <Link key={action.label} to={action.path} className="quick-action-btn">
                    <span style={{ color: action.color }}>{action.icon}</span>
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="info-card">
              <h2>System Info</h2>
              <div className="info-list">
                <div className="info-item">
                  <span>Status</span>
                  <span className="info-value online">● Online</span>
                </div>
                <div className="info-item">
                  <span>Admin Role</span>
                  <span className="info-value">Super Admin</span>
                </div>
                <div className="info-item">
                  <span>Last Login</span>
                  <span className="info-value">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="info-item">
                  <span>Total Content</span>
                  <span className="info-value">
                    {stats.careers + stats.services + stats.platforms + stats.collaborations} items
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
