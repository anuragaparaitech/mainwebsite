import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  if (loading) {
    return (
      <div style={styles.loader}>
        <div style={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  return admin ? children : <Navigate to="/login" replace />;
};

const styles = {
  loader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    gap: '16px',
    color: '#4f46e5',
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '4px solid #e0e7ff',
    borderTop: '4px solid #4f46e5',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
};

export default ProtectedRoute;
