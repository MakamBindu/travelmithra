import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
    // Redirect to their own dashboard if they try to access another role's area
    const dashboardMap = {
      customer: '/customer-dashboard',
      guide: '/guide-dashboard',
      admin: '/admin-dashboard'
    };
    return <Navigate to={dashboardMap[userInfo.role] || '/home'} replace />;
  }

  return children;
};

export default ProtectedRoute;
