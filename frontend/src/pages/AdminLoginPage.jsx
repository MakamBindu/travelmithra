import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShieldCheck } from 'lucide-react';
import './Auth.css';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (email === 'admin' && password === 'admin@123') {
        const demoAdmin = {
          _id: 'admin_demo',
          name: 'Super Admin',
          email: 'admin@travelmithra.com',
          phone: '9988776655',
          city: 'Hyderabad',
          role: 'admin',
          token: 'demo_token_123'
        };
        localStorage.setItem('userInfo', JSON.stringify(demoAdmin));
        navigate('/dashboard/admin');
      } else {
        setError('Invalid admin credentials. Access denied.');
      }
    } catch (err) {
      setError('An error occurred during login.');
    }
  };

  return (
    <div className="auth-page admin-auth">
      <div className="auth-card glass-panel animate-fade-in" style={{ borderTop: '4px solid var(--primary-blue)' }}>
        <div className="auth-header">
          <div className="auth-icon-bg" style={{ background: 'var(--primary-blue)' }}><ShieldCheck size={32} /></div>
          <h2>Admin Portal</h2>
          <p>Secure access for TravelMithra administrators</p>
        </div>
        
        {error && <div className="error-message" style={{ background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center' }}>{error}</div>}
        
        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>Admin Username</label>
            <input 
              type="text" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn-primary full-width" style={{ marginTop: '1rem' }}>Enter Dashboard</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
