import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { 
  Save, User, Bell, Shield, Globe, CheckCircle, 
  Moon, Sun, Lock, Eye, EyeOff, Trash2, LogOut,
  Clock, IndianRupee, MessageSquare, Calendar
} from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';

const SettingsPage = () => {
  const [userInfo] = useOutletContext();
  const navigate = useNavigate();
  const { t, language: currentLang, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('account');
  const [saved, setSaved] = useState(false);

  // Load settings from localStorage or use defaults
  const [formData, setFormData] = useState(() => {
    const savedSettings = localStorage.getItem(`settings_${userInfo?._id}`);
    const globalLang = localStorage.getItem('travelmithra_lang') || 'English';
    const defaultSettings = {
      name: userInfo?.name || '',
      email: userInfo?.email || '',
      phone: userInfo?.phone || '',
      city: userInfo?.city || '',
      language: globalLang,
      currency: 'INR',
      // Notification Toggles
      bookingUpdates: true,
      messageNotifications: true,
      adminUpdates: false,
      emailNotifications: true,
      // Privacy Toggles
      showPhone: false,
      showProfilePublicly: true,
      hideFromSearch: false,
      // Appearance
      darkMode: false,
      // Security
      twoFactor: false,
      // Guide Specific
      pricePerHour: userInfo?.pricePerHour || 1500,
      currentlyAvailable: true,
      availabilitySchedule: 'Weekdays 9 AM - 6 PM'
    };
    return savedSettings ? { ...defaultSettings, ...JSON.parse(savedSettings) } : defaultSettings;
  });

  // Effect to apply dark mode
  useEffect(() => {
    if (formData.darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [formData.darkMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Auto-save dark mode for immediate effect
    if (name === 'darkMode') {
      const updated = { ...formData, darkMode: checked };
      localStorage.setItem(`settings_${userInfo?._id}`, JSON.stringify(updated));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem(`settings_${userInfo?._id}`, JSON.stringify(formData));
    localStorage.setItem('travelmithra_lang', formData.language);
    setLanguage(formData.language);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const renderToggle = (name, label, icon) => (
    <div className="settings-toggle-row">
      <div className="toggle-info">
        {icon && React.createElement(icon, { size: 18, className: 'toggle-icon' })}
        <span>{label}</span>
      </div>
      <label className="switch">
        <input 
          type="checkbox" 
          name={name} 
          checked={formData[name]} 
          onChange={handleChange} 
        />
        <span className="slider round"></span>
      </label>
    </div>
  );

  return (
    <div className="settings-container animate-fade-in">
      <div className="settings-header glass-panel">
        <div>
          <h1>{t('settings_title')}</h1>
          <p>Manage your account, preferences, and platform experience.</p>
        </div>
        <button onClick={handleSave} className="btn-primary save-btn">
          <Save size={18} /> {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="settings-layout">
        <aside className="settings-sidebar glass-panel">
          <nav>
            <button type="button" onClick={() => setActiveTab('account')} className={activeTab === 'account' ? 'active' : ''}>
              <User size={18} /> Account Settings
            </button>
            <button type="button" onClick={() => setActiveTab('appearance')} className={activeTab === 'appearance' ? 'active' : ''}>
              <Moon size={18} /> Appearance
            </button>
            <button type="button" onClick={() => setActiveTab('notifications')} className={activeTab === 'notifications' ? 'active' : ''}>
              <Bell size={18} /> Notifications
            </button>
            <button type="button" onClick={() => setActiveTab('privacy')} className={activeTab === 'privacy' ? 'active' : ''}>
              <Shield size={18} /> Privacy
            </button>
            {userInfo?.role === 'guide' && (
              <button type="button" onClick={() => setActiveTab('guide')} className={activeTab === 'guide' ? 'active' : ''}>
                <Clock size={18} /> Guide Settings
              </button>
            )}
            <button type="button" onClick={() => setActiveTab('region')} className={activeTab === 'region' ? 'active' : ''}>
              <Globe size={18} /> Language & Region
            </button>
            <div className="nav-divider"></div>
            <button type="button" onClick={handleLogout} className="logout-nav-btn">
              <LogOut size={18} /> Sign Out
            </button>
          </nav>
        </aside>

        <main className="settings-main glass-panel">
          <form onSubmit={handleSave}>
            {activeTab === 'account' && (
              <div className="settings-section">
                <h3><User size={20}/> Profile Information</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" value={formData.email} disabled />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                  </div>
                </div>

                <h3 className="mt-2"><Lock size={20}/> Change Password</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Current Password</label>
                    <input type="password" placeholder="••••••••" />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input type="password" />
                  </div>
                </div>
                {renderToggle('twoFactor', 'Enable Two-Factor Authentication', Shield)}
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="settings-section">
                <h3><Moon size={20}/> Appearance</h3>
                <div className="theme-selector">
                   <div 
                     className={`theme-option ${!formData.darkMode ? 'active' : ''}`}
                     onClick={() => handleChange({ target: { name: 'darkMode', type: 'checkbox', checked: false }})}
                   >
                     <Sun size={24} />
                     <span>Light Mode</span>
                   </div>
                   <div 
                     className={`theme-option ${formData.darkMode ? 'active' : ''}`}
                     onClick={() => handleChange({ target: { name: 'darkMode', type: 'checkbox', checked: true }})}
                   >
                     <Moon size={24} />
                     <span>Dark Mode</span>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="settings-section">
                <h3><Bell size={20}/> Notifications</h3>
                {renderToggle('bookingUpdates', 'Booking Updates', Calendar)}
                {renderToggle('messageNotifications', 'Direct Messages', MessageSquare)}
                {renderToggle('adminUpdates', 'Platform Announcements', Shield)}
                {renderToggle('emailNotifications', 'Email Notifications', Globe)}
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="settings-section">
                <h3><Shield size={20}/> Privacy Settings</h3>
                {renderToggle('showPhone', 'Show phone number to booked travelers', Eye)}
                {renderToggle('showProfilePublicly', 'Make profile visible to everyone', Globe)}
                {renderToggle('hideFromSearch', 'Hide my profile from search results', EyeOff)}
              </div>
            )}

            {activeTab === 'guide' && userInfo?.role === 'guide' && (
              <div className="settings-section">
                <h3><Clock size={20}/> Guide Controls</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Price Per Hour (₹)</label>
                    <input type="number" name="pricePerHour" value={formData.pricePerHour} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Default Availability</label>
                    <input type="text" name="availabilitySchedule" value={formData.availabilitySchedule} onChange={handleChange} />
                  </div>
                </div>
                {renderToggle('currentlyAvailable', 'Currently Available for Instant Booking', CheckCircle)}
              </div>
            )}

            {activeTab === 'region' && (
              <div className="settings-section">
                <h3><Globe size={20}/> Language & Region</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Preferred Language</label>
                    <select name="language" value={formData.language} onChange={handleChange}>
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="French">French</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Currency</label>
                    <select name="currency" value={formData.currency} onChange={handleChange}>
                      <option value="INR">₹ INR (Indian Rupee)</option>
                      <option value="USD">$ USD (US Dollar)</option>
                      <option value="EUR">€ EUR (Euro)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="danger-section mt-3">
              <h3>Account Actions</h3>
              <div className="action-buttons">
                <button type="button" onClick={handleLogout} className="btn-secondary">
                  <LogOut size={18} /> Sign Out
                </button>
                <button type="button" className="btn-danger" onClick={() => alert('Are you sure you want to delete your account? This action is permanent.')}>
                  <Trash2 size={18} /> Delete Account
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .settings-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .settings-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          margin-bottom: 2rem;
          border-radius: 24px;
        }
        .settings-header h1 { margin: 0; font-size: 1.75rem; }
        .settings-header p { margin: 0.5rem 0 0 0; color: var(--text-light); }
        
        .settings-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2rem;
        }
        
        .settings-sidebar {
          padding: 1.5rem;
          border-radius: 24px;
          height: fit-content;
        }
        .settings-sidebar nav { display: flex; flex-direction: column; gap: 0.5rem; }
        .settings-sidebar button {
          width: 100%;
          text-align: left;
          padding: 1rem;
          border-radius: 12px;
          border: none;
          background: transparent;
          color: var(--text-color);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        .settings-sidebar button:hover { background: rgba(59, 130, 246, 0.05); color: var(--primary-blue); }
        .settings-sidebar button.active { background: var(--primary-blue); color: white; }
        .logout-nav-btn { color: #ef4444 !important; }
        .logout-nav-btn:hover { background: rgba(239, 68, 68, 0.05) !important; }

        .settings-main {
          padding: 3rem;
          border-radius: 24px;
        }
        .settings-section h3 {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 0 0 2rem 0;
          font-size: 1.25rem;
          color: var(--primary-blue);
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .form-group input, .form-group select {
          width: 100%;
          padding: 0.85rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          background: var(--card-bg);
          color: var(--text-color);
        }

        .settings-toggle-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid var(--border-color);
        }
        .toggle-info { display: flex; align-items: center; gap: 0.75rem; font-weight: 500; }
        .toggle-icon { color: var(--primary-blue); }

        .theme-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .theme-option {
          padding: 2rem;
          border-radius: 20px;
          border: 2px solid var(--border-color);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          transition: all 0.3s;
        }
        .theme-option.active { border-color: var(--primary-blue); background: rgba(59, 130, 246, 0.05); }

        .danger-section {
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
        }
        .danger-section h3 { color: #ef4444; }
        .action-buttons { display: flex; gap: 1rem; }
        .btn-danger {
          background: #ef4444; color: white; border: none; padding: 0.85rem 1.5rem;
          border-radius: 12px; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;
        }

        /* Switch UI */
        .switch { position: relative; display: inline-block; width: 48px; height: 24px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider {
          position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
          background-color: #ccc; transition: .4s; border-radius: 24px;
        }
        .slider:before {
          position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px;
          background-color: white; transition: .4s; border-radius: 50%;
        }
        input:checked + .slider { background-color: var(--primary-blue); }
        input:checked + .slider:before { transform: translateX(24px); }

        @media (max-width: 992px) {
          .settings-layout { grid-template-columns: 1fr; }
          .form-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
};

export default SettingsPage;
