import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, MessageCircle, Share2, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer glass-panel">
      <div className="footer-content">
        <div className="footer-section">
          <div style={{display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem'}}>
             <img src="/logo.png" alt="Logo" style={{height:'35px', width:'35px', objectFit:'contain'}} />
             <h3 style={{margin:0}}>TravelMithra</h3>
          </div>
          <p>{t('footer_about_desc')}</p>
          <div className="social-links">
            <a href="#"><Globe size={20} /></a>
            <a href="#"><MessageCircle size={20} /></a>
            <a href="#"><Share2 size={20} /></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>{t('footer_quick_links')}</h4>
          <ul>
            <li><Link to="/home">{t('nav_home')}</Link></li>
            <li><Link to="/explore">Explore Cities</Link></li>
            <li><Link to="/help">{t('nav_help')}</Link></li>
            <li><Link to="/contact">{t('nav_contact')}</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>{t('footer_contact_info')}</h4>
          <ul className="contact-list">
            <li><MapPin size={18} /> Hyderabad, India</li>
            <li><Phone size={18} /> +91 98765 43210</li>
            <li><Mail size={18} /> support@travelmithra.com</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} TravelMithra. {t('footer_rights')}</p>
        <div className="footer-bottom-links">
          <a href="#">{t('footer_privacy')}</a>
          <a href="#">{t('footer_terms')}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
