import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../utils/LanguageContext';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyPress = () => {
      navigate('/home');
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleKeyPress); // Also add click for better UX

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleKeyPress);
    };
  }, [navigate]);

  return (
    <div className="landing-page">
      <div className="landing-overlay"></div>
      <div className="landing-content animate-fade-in text-on-bg">
        <h1 className="landing-title text-on-bg">{t('welcome')}</h1>
        <p className="landing-subtitle text-on-bg">{t('subtitle')}</p>
        <div className="press-key-hint animate-float" style={{ marginTop: '3rem', fontSize: '1rem', opacity: 0.7, fontWeight: 500, letterSpacing: '0.1em' }}>
          {t('press_key')}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
