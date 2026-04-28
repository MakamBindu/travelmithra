import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './HelpContact.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <div className="help-contact-container animate-fade-in">
        <div className="help-header glass-panel">
          <h1>Get in Touch</h1>
          <p style={{ marginTop: '1rem', color: '#475569', fontWeight: 500 }}>
            Have questions about TravelMithra? We'd love to hear from you.
          </p>
        </div>

        <div className="contact-layout">
          <div className="contact-info glass-panel">
            <h3>Contact Information</h3>
            <p className="text-light" style={{ marginBottom: '2rem' }}>
              Fill out the form and our team will get back to you within 24 hours.
            </p>
            
            <div className="info-item">
              <Phone className="text-blue" size={24} />
              <div>
                <h4>Phone</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>
            
            <div className="info-item">
              <Mail className="text-green" size={24} />
              <div>
                <h4>Email</h4>
                <p>support@travelmithra.com</p>
              </div>
            </div>
            
            <div className="info-item">
              <MapPin className="text-orange" size={24} />
              <div>
                <h4>Office</h4>
                <p>123 Innovation Drive,<br/>Tech Park, Bangalore 560001</p>
              </div>
            </div>
          </div>

          <div className="contact-form-container glass-panel">
            {submitted ? (
              <div className="success-message text-center" style={{ padding: '3rem 0' }}>
                <div style={{ background: '#d1fae5', color: '#059669', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <Send size={30} />
                </div>
                <h3>Message Sent Successfully!</h3>
                <p className="text-light">Thank you for reaching out. We will respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label>Your Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Subject</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Message</label>
                  <textarea 
                    rows="5" 
                    required 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us how we can help..."
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="checkbox-container" style={{display:'flex', alignItems:'center', gap:'0.75rem', cursor:'pointer'}}>
                    <input type="checkbox" required style={{width:'18px', height:'18px'}} />
                    <span style={{fontSize:'0.9rem', color:'var(--text-light)'}}>I agree to the Terms of Service and Privacy Policy</span>
                  </label>
                </div>
                
                <button type="submit" className="btn-primary full-width" style={{ marginTop: '1rem' }}>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
  );
};

export default ContactPage;
