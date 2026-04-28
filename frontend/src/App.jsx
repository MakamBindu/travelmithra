import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CityExploration from './pages/CityExploration';
import GuideProfile from './pages/GuideProfile';
import HelpPage from './pages/HelpPage';
import ContactPage from './pages/ContactPage';
import TripPlanner from './pages/TripPlanner';
import BookingFlow from './pages/BookingFlow';
import AdminLoginPage from './pages/AdminLoginPage';
import AIAssistantWidget from './components/AIAssistantWidget';
import MainLayout from './components/MainLayout';
import { LanguageProvider } from './utils/LanguageContext';
import GlobalBackground from './components/GlobalBackground';

// Role-Based Dashboards
import CustomerDashboard from './pages/customer/CustomerDashboard';
import GuideDashboard from './pages/guide/GuideDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <LanguageProvider>
      <GlobalBackground />
      <Router>
        <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          {/* Public Pages with Header and Footer */}
          <Route element={<MainLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/explore" element={<ProtectedRoute><CityExploration /></ProtectedRoute>} />
            <Route path="/planner" element={<ProtectedRoute><TripPlanner /></ProtectedRoute>} />
            <Route path="/book" element={<ProtectedRoute><BookingFlow /></ProtectedRoute>} />
            <Route path="/guide/:id" element={<ProtectedRoute><GuideProfile /></ProtectedRoute>} />
          </Route>
          
          {/* Role-Based Dashboards (Strictly Separated) */}
          <Route 
            path="/customer-dashboard/*" 
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <CustomerDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/guide-dashboard/*" 
            element={
              <ProtectedRoute allowedRoles={['guide']}>
                <GuideDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin-dashboard/*" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Legacy Redirect */}
          <Route path="/dashboard" element={<Navigate to="/login" replace />} />
        </Routes>
        <AIAssistantWidget />
      </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
