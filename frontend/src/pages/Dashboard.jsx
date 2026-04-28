import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet, NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Users, MapPin, Settings, LogOut, Menu, X, CalendarCheck, Home } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(() => {
    try {
      const data = localStorage.getItem('userInfo');
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error('Error parsing userInfo:', err);
      return null;
    }
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!userInfo) return <div className="animate-fade-in" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading dashboard...</div>;

  return (
    <div className="dashboard-layout">
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>TravelMithra</h2>
          <button className="menu-btn lg-hidden" onClick={toggleSidebar}>
            <X size={20} />
          </button>
        </div>
        
        <div className="user-profile-summary">
          <div className="avatar">{userInfo.name ? userInfo.name.charAt(0) : '?'}</div>
          <div className="user-info">
            <h4>{userInfo.name}</h4>
            <span className="role-badge">{userInfo.role}</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={20} /> Overview
          </NavLink>

          {userInfo.role === 'admin' && (
            <NavLink to="/dashboard/admin" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Users size={20} /> Pending Approvals
            </NavLink>
          )}
          
          {userInfo.status === 'approved' && (
            <>
              {(userInfo.role === 'customer' || userInfo.role === 'admin') && (
                <>
                  <NavLink to="/explore" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <MapPin size={20} /> Explore City
                  </NavLink>
                  <NavLink to="/dashboard/customer-bookings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <CalendarCheck size={20} /> My Bookings
                  </NavLink>
                </>
              )}

              {userInfo.role === 'guide' && (
                <NavLink to="/dashboard/guide-bookings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <CalendarCheck size={20} /> Booking Requests
                </NavLink>
              )}
            </>
          )}

          <NavLink to="/dashboard/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Settings size={20} /> Settings
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <header className="dashboard-header glass-panel">
          <button className="menu-btn" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <div className="header-right">
            <Link to="/home" className="home-icon-link" title="Back to Home">
              <Home size={20} />
            </Link>
            <span>Welcome, {userInfo.name}</span>
          </div>
        </header>

        <main className="dashboard-main">
          {userInfo.role === 'guide' && userInfo.status === 'pending' ? (
            <div className="pending-notice glass-panel animate-fade-in" style={{ padding: '4rem 2rem', textAlign: 'center', marginTop: '2rem' }}>
              <div className="animate-float" style={{ marginBottom: '2rem' }}>
                <Users size={80} color="var(--primary-blue)" style={{ opacity: 0.8 }} />
              </div>
              <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem', fontWeight: 800 }}>Application Under Review</h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
                Our team is currently verifying your profile details and guide credentials. 
                You'll receive full access to accept bookings once your application is approved!
              </p>
              <div className="status-badge" style={{ display: 'inline-block', padding: '0.75rem 2rem', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary-blue)', borderRadius: '100px', fontWeight: '700', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Current Status: Pending Verification
              </div>
            </div>
          ) : (
            <Outlet context={[userInfo]} />
          )}
        </main>

        <footer className="dashboard-footer" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-light)', fontSize: '0.95rem', opacity: 0.5, fontWeight: 500 }}>
          &copy; {new Date().getFullYear()} TravelMithra. Crafted with ❤️ for travelers.
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
