import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import './Auth.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError('Please enter both email and password.');
    
    setError('');
    setLoading(true);
    // Admin hardcoded credentials check
    if (email === 'admin' && password === 'admin2123') {
      const adminUser = {
        _id: 'admin_id',
        name: 'Platform Admin',
        email: 'admin@travelmithra.com',
        role: 'admin',
        token: 'mock-admin-token'
      };
      localStorage.setItem('userInfo', JSON.stringify(adminUser));
      navigate('/admin-dashboard');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      
      // Role-based redirection
      const role = response.data.role;
      if (role === 'guide') navigate('/guide-dashboard');
      else if (role === 'admin') navigate('/admin-dashboard');
      else navigate('/customer-dashboard');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page animate-fade-in">
      <div className="auth-card glass-panel">
        <div className="auth-header">
          <div className="auth-icon-bg"><LogIn size={32} /></div>
          <h2>Welcome Back</h2>
          <p>Enter your credentials to access your account</p>
        </div>

        {error && (
          <div className="auth-status-box error">
            <AlertCircle size={18} /> <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label><Mail size={14}/> Email Address</label>
            <div className="input-with-icon">
              <input 
                type="email" 
                placeholder="name@example.com"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className={error ? 'input-error' : ''}
              />
            </div>
          </div>
          <div className="form-group">
            <label><Lock size={14}/> Password</label>
            <div className="input-with-icon">
              <input 
                type="password" 
                placeholder="••••••••"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className={error ? 'input-error' : ''}
              />
            </div>
          </div>
          
          <button type="submit" className="btn-primary full-width large" disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={18} />
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup">Create one for free</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
