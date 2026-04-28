import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Lock, UserCheck, Image, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import './Auth.css';

const SignupPage = () => {
  const [role, setRole] = useState('customer');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', city: '', password: '',
    languages: '', experience: '', knowledgeLevel: 'Beginner', 
    availability: '', pricePerHour: '', bio: '', profilePhoto: '', gender: 'Male'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      const payload = {
        ...formData,
        role,
        languages: role === 'guide' ? formData.languages.split(',').map(l => l.trim()) : [],
        pricePerHour: role === 'guide' ? Number(formData.pricePerHour) : 0
      };

      const { data } = await axios.post('http://localhost:5000/api/auth/register', payload);
      
      if (role === 'guide') {
        setSuccess('Registration successful! Your profile is now under review by our admin team.');
        setTimeout(() => navigate('/login'), 3500);
      } else {
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page animate-fade-in">
      <div className="auth-card glass-panel wide">
        <div className="auth-header">
          <div className="auth-icon-bg"><User size={32} /></div>
          <h2>Join TravelMithra</h2>
          <p>Choose your role and start your journey with us</p>
        </div>

        <div className="role-switcher">
          <button 
            className={`role-tab ${role === 'customer' ? 'active' : ''}`} 
            onClick={() => setRole('customer')}
          >
            <User size={18} /> Traveler
          </button>
          <button 
            className={`role-tab ${role === 'guide' ? 'active' : ''}`} 
            onClick={() => setRole('guide')}
          >
            <UserCheck size={18} /> Student Guide
          </button>
        </div>

        {error && <div className="auth-status-box error"><AlertCircle size={18} /> {error}</div>}
        {success && <div className="auth-status-box success"><CheckCircle2 size={18} /> {success}</div>}

        <form onSubmit={handleSignup} className="auth-form">
          <div className="form-grid-2">
            <div className="form-group">
              <label><User size={14}/> Full Name</label>
              <input type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label><Mail size={14}/> Email Address</label>
              <input type="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label><Phone size={14}/> Phone Number</label>
              <input type="text" name="phone" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label><MapPin size={14}/> Home City</label>
              <input type="text" name="city" placeholder="e.g. Mumbai" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label><Lock size={14}/> Password</label>
              <input type="password" name="password" placeholder="Min. 8 characters" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {role === 'guide' && (
              <div className="guide-extra-fields grid-full">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label><FileText size={14}/> Languages (comma separated)</label>
                    <input type="text" name="languages" placeholder="English, Hindi, Telugu" value={formData.languages} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Knowledge Level</label>
                    <select name="knowledgeLevel" value={formData.knowledgeLevel} onChange={handleChange}>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Availability</label>
                    <input type="text" name="availability" placeholder="e.g. Weekends" value={formData.availability} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Price per Hour (₹)</label>
                    <input type="number" name="pricePerHour" placeholder="500" value={formData.pricePerHour} onChange={handleChange} required />
                  </div>
                  <div className="form-group grid-full">
                    <label><Image size={14}/> Profile Photo or ID Document</label>
                    <input 
                      type="file" 
                      accept="image/*,application/pdf"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setFormData({ ...formData, profilePhoto: reader.result });
                          reader.readAsDataURL(file);
                        }
                      }} 
                      required 
                    />
                  </div>
                  <div className="form-group grid-full">
                    <label>Short Bio</label>
                    <textarea name="bio" placeholder="Tell travelers about yourself and why they should choose you as their guide..." value={formData.bio} onChange={handleChange} required rows="3"></textarea>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button type="submit" className="btn-primary full-width large mt-2" disabled={loading}>
            {loading ? 'Creating Account...' : `Sign Up as ${role === 'guide' ? 'Guide' : 'Traveler'}`}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign in here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
