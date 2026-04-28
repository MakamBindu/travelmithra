import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useLanguage } from '../utils/LanguageContext';
import { 
  Users, MapPin, Calendar, Star, TrendingUp, ShieldCheck, 
  CheckCircle, X, Clock, IndianRupee, ArrowRight, ExternalLink 
} from 'lucide-react';

const DashboardOverview = () => {
  const [userInfo] = useOutletContext();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [availabilityMsg, setAvailabilityMsg] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [showDetailModal, setShowDetailModal] = useState(null);

  const handleUpdateAvailability = () => {
    setIsAvailable(!isAvailable);
    setAvailabilityMsg(true);
    setTimeout(() => setAvailabilityMsg(false), 3000);
  };

  const stats = {
    customer: [
      { label: 'Places Visited', value: '12', icon: <MapPin size={24} />, color: '#3b82f6' },
      { label: 'Total Bookings', value: '5', icon: <Calendar size={24} />, color: '#10b981' },
      { label: 'Reviews Given', value: '3', icon: <Star size={24} />, color: '#f59e0b' }
    ],
    guide: [
      { label: 'Requests', value: '8', icon: <Users size={24} />, color: '#3b82f6' },
      { label: 'Earnings', value: '₹12,400', icon: <TrendingUp size={24} />, color: '#10b981' },
      { label: 'Rating', value: '4.8', icon: <Star size={24} />, color: '#f59e0b' }
    ],
    admin: [
      { label: 'Total Users', value: '1,240', icon: <Users size={24} />, color: '#3b82f6' },
      { label: 'Pending Guides', value: '14', icon: <ShieldCheck size={24} />, color: '#10b981' },
      { label: 'Monthly Revenue', value: '₹2.4L', icon: <TrendingUp size={24} />, color: '#f59e0b' }
    ]
  };

  const detailsMap = {
    'Earnings': [
      { id: 1, name: 'Rahul Sharma', hours: 4, amount: 2000, date: '2024-04-20', status: 'Paid' },
      { id: 2, name: 'Priya Singh', hours: 6, amount: 3000, date: '2024-04-18', status: 'Paid' },
      { id: 3, name: 'Anish Kumar', hours: 3, amount: 1500, date: '2024-04-15', status: 'Pending' },
    ],
    'Requests': [
      { id: 1, name: 'Sunita Das', city: 'Mumbai', date: '2024-04-26', hours: 4, type: 'Solo' },
      { id: 2, name: 'Vijay Kapoor', city: 'Delhi', date: '2024-04-27', hours: 8, type: 'Group' },
    ],
    'Total Bookings': [
      { id: 1, guide: 'Arun Kumar', city: 'Mumbai', date: '2024-04-05', cost: 1200, status: 'Completed' },
      { id: 2, guide: 'Sara Khan', city: 'Delhi', date: '2024-03-20', cost: 2500, status: 'Completed' },
    ]
  };

  const currentStats = stats[userInfo.role] || [];

  return (
    <div className="dashboard-overview animate-fade-in">
      <div className="overview-header mb-3">
        <h1 className="text-on-bg shadow-text">Welcome back, {userInfo.name}!</h1>
        <p className="text-on-bg" style={{ opacity: 0.8 }}>Here's what's happening with your account today.</p>
      </div>

      {userInfo.role === 'guide' && (
        <div className={`status-banner glass-panel mb-2 ${isAvailable ? 'available' : 'busy'}`}>
          <div className="status-indicator"></div>
          <span>{isAvailable ? 'You are currently visible to travelers' : 'You are currently hidden from search'}</span>
          <button className="btn-secondary small ms-auto" onClick={handleUpdateAvailability}>Toggle Status</button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid-3 mb-4">
        {currentStats.map((stat, index) => (
          <div key={index} className="airbnb-card" onClick={() => setShowDetailModal(stat)}>
            <div className="airbnb-card-body d-flex align-items-center gap-2">
              <div className="stat-icon-wrapper" style={{ background: `${stat.color}15`, color: stat.color, padding: '1rem', borderRadius: '16px' }}>
                {stat.icon}
              </div>
              <div>
                <p className="airbnb-text mb-0">{stat.label}</p>
                <h2 className="airbnb-title mb-0">{stat.value}</h2>
              </div>
              <ChevronRight size={20} className="ms-auto" style={{ opacity: 0.2 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Role-Specific Sections */}
      <div className="dashboard-sections grid-2">
        {userInfo.role === 'customer' && (
          <div className="section-block">
            <h3 className="text-on-bg mb-2">Recent Adventures</h3>
            <div className="airbnb-card">
              <div className="airbnb-card-body">
                <div className="trip-list-item d-flex gap-2 mb-2 pb-2" style={{ borderBottom: '1px solid #f1f5f9' }}>
                   <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=80&h=80&fit=crop" style={{ borderRadius: '12px' }} />
                   <div>
                      <h4 className="airbnb-title">Paris, France</h4>
                      <p className="airbnb-text small">Guided by Sarah M. • April 12</p>
                      <span className="tag-pill-blue">Completed</span>
                   </div>
                </div>
                <button className="btn-view-all full-width" onClick={() => navigate('/dashboard/customer-bookings')}>View All Bookings <ArrowRight size={16}/></button>
              </div>
            </div>
          </div>
        )}

        {userInfo.role === 'guide' && (
          <div className="section-block">
            <h3 className="text-on-bg mb-2">Earnings Insight</h3>
            <div className="airbnb-card">
              <div className="airbnb-card-body text-center">
                 <div className="chart-placeholder mb-2">
                    <TrendingUp size={48} className="text-green mb-1" />
                    <h2 className="airbnb-title">₹12,400</h2>
                    <p className="airbnb-text">Total earnings this month</p>
                 </div>
                 <button className="btn-primary full-width" onClick={() => setShowDetailModal(currentStats[1])}>View Payment History</button>
              </div>
            </div>
          </div>
        )}

        <div className="section-block">
          <h3 className="text-on-bg mb-2">Quick Actions</h3>
          <div className="airbnb-card">
            <div className="airbnb-card-body d-flex flex-column gap-1">
              {userInfo.role === 'customer' && <button className="btn-primary full-width" onClick={() => navigate('/explore')}>Find a Guide</button>}
              {userInfo.role === 'guide' && <button className="btn-primary full-width" onClick={() => navigate('/dashboard/guide-bookings')}>Manage Requests</button>}
              <button className="btn-secondary full-width" onClick={() => navigate('/planner')}>Plan a New Trip</button>
              <button className="btn-secondary full-width" onClick={() => navigate('/dashboard/settings')}>Edit Profile</button>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && (
        <div className="modal-overlay-global" onClick={() => setShowDetailModal(null)}>
          <div className="modal-card-global" onClick={e => e.stopPropagation()}>
            <div className="modal-card-header p-2 d-flex justify-content-between align-items-center" style={{ borderBottom: '1px solid #f1f5f9' }}>
               <div className="d-flex align-items-center gap-1">
                  <div style={{ color: showDetailModal.color }}>{showDetailModal.icon}</div>
                  <h3 className="airbnb-title m-0">{showDetailModal.label} Details</h3>
               </div>
               <button className="btn-close-modal" onClick={() => setShowDetailModal(null)}><X size={24}/></button>
            </div>
            
            <div className="modal-card-body p-2">
              {!detailsMap[showDetailModal.label] ? (
                <div className="text-center p-3">
                   <p className="airbnb-text">No detailed records found for this category yet.</p>
                </div>
              ) : (
                <div className="details-stack">
                  {detailsMap[showDetailModal.label].map(item => (
                    <div key={item.id} className="detail-row p-1 mb-1" style={{ background: '#f8fafc', borderRadius: '16px' }}>
                      <div className="d-flex justify-content-between mb-05">
                         <strong className="airbnb-title">{item.name || item.guide}</strong>
                         <span className="airbnb-text small">{item.date}</span>
                      </div>
                      <div className="d-flex gap-2">
                         {item.amount && <span className="price-tag-pop">₹{item.amount}</span>}
                         {item.city && <span className="airbnb-text small"><MapPin size={12}/> {item.city}</span>}
                         {item.status && <span className="tag-pill-blue" style={{ background: item.status === 'Paid' ? '#dcfce7' : '#fef9c3', color: item.status === 'Paid' ? '#166534' : '#854d0e' }}>{item.status}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="modal-card-footer p-2 text-center">
               <button className="btn-primary full-width" onClick={() => setShowDetailModal(null)}>Got it</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Simple ChevronRight fallback
const ChevronRight = ({ size, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="m9 18 6-6-6-6"/></svg>
);

export default DashboardOverview;
