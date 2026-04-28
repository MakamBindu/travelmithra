import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, User, UserPlus, LayoutDashboard, HelpCircle, 
  Phone, Shield, Sparkles, Menu, X, LogOut 
} from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';
import './Navbar.css';

const Navbar = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
  const isAdmin = userInfo?.role === 'admin';

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
    setIsMenuOpen(false);
  };

  const NavItem = ({ to, icon: Icon, label, className = '' }) => (
    <Link 
      to={to} 
      className={`nav-item ${isActive(to) ? 'active' : ''} ${className}`}
      onClick={() => setIsMenuOpen(false)}
    >
      <Icon size={18} /> <span>{label}</span>
    </Link>
  );

  return (
    <nav className="navbar glass-panel sticky-nav container">
      <div className="navbar-logo">
        <Link to="/home" className="logo-link">
          <img src="/logo.png" alt="TravelMithra" className="logo-img" />
          <span className="logo-text">Travel<span className="text-blue">Mithra</span></span>
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="navbar-links desktop-only">
        <NavItem to="/home" icon={Home} label={t('nav_home')} />
        <NavItem to="/planner" icon={Sparkles} label="Trip Planner" className="text-blue" />
        
        {!userInfo ? (
          <>
            <NavItem to="/login" icon={User} label={t('nav_login')} />
            <NavItem to="/signup" icon={UserPlus} label={t('nav_signup')} />
            <NavItem to="/admin-login" icon={Shield} label="Admin Login" className="admin-nav" />
          </>
        ) : (
          <>
            {userInfo.role === 'guide' && <NavItem to="/guide-dashboard" icon={LayoutDashboard} label="Guide Panel" />}
            {userInfo.role === 'admin' && <NavItem to="/admin-dashboard" icon={Shield} label="Admin Core" />}
            {userInfo.role === 'customer' && <NavItem to="/customer-dashboard" icon={LayoutDashboard} label="My Trips" />}
            <button className="nav-item" onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
               <LogOut size={18} /> <span>Logout</span>
            </button>
          </>
        )}

        <NavItem to="/help" icon={HelpCircle} label={t('nav_help')} />
        <NavItem to="/contact" icon={Phone} label="Contact Us" />
      </div>

      {/* Mobile Toggle */}
      <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu animate-fade-in">
          <div className="mobile-links">
            <NavItem to="/home" icon={Home} label={t('nav_home')} />
            <NavItem to="/planner" icon={Sparkles} label="Trip Planner" />
            <NavItem to="/explore" icon={Compass} label="Explore" />
            
            {userInfo ? (
              <>
                <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
                <button className="nav-item logout-btn" onClick={handleLogout}>
                  <LogOut size={18} /> <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <NavItem to="/login" icon={User} label="Login" />
                <NavItem to="/signup" icon={UserPlus} label="Sign Up" />
              </>
            )}
            
            <NavItem to="/help" icon={HelpCircle} label="Help & Support" />
            <NavItem to="/contact" icon={Phone} label="Contact Us" />
          </div>
        </div>
      )}
    </nav>
  );
};

const Compass = ({ size }) => <Sparkles size={size} />; // Placeholder icon

export default Navbar;
