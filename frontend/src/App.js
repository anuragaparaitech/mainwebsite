import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Careers from './pages/Careers/Careers';
import CareerForm from './pages/Careers/CareerForm';
import Services from './pages/Services/Services';
import ServiceForm from './pages/Services/ServiceForm';
import Platforms from './pages/Platforms/Platforms';
import PlatformForm from './pages/Platforms/PlatformForm';
import Collaborations from './pages/Collaborations/Collaborations';
import CollaborationForm from './pages/Collaborations/CollaborationForm';
import Settings from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />

            {/* Careers */}
            <Route path="careers" element={<Careers />} />
            <Route path="careers/new" element={<CareerForm />} />
            <Route path="careers/edit/:id" element={<CareerForm />} />

            {/* Services */}
            <Route path="services" element={<Services />} />
            <Route path="services/new" element={<ServiceForm />} />
            <Route path="services/edit/:id" element={<ServiceForm />} />

            {/* Platforms */}
            <Route path="platforms" element={<Platforms />} />
            <Route path="platforms/new" element={<PlatformForm />} />
            <Route path="platforms/edit/:id" element={<PlatformForm />} />

            {/* Collaborations */}
            <Route path="collaborations" element={<Collaborations />} />
            <Route path="collaborations/new" element={<CollaborationForm />} />
            <Route path="collaborations/edit/:id" element={<CollaborationForm />} />

            {/* Settings */}
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
