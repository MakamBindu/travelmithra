import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Check, X } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [pendingGuides, setPendingGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPendingGuides = async () => {
    try {
      const userInfoStr = localStorage.getItem('userInfo');
      if (!userInfoStr) {
        setError('Session expired. Please login again.');
        setLoading(false);
        return;
      }
      const userInfo = JSON.parse(userInfoStr);
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      };
      const { data } = await axios.get('http://localhost:5000/api/admin/guides/pending', config);
      setPendingGuides(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching guides');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingGuides();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const userInfoStr = localStorage.getItem('userInfo');
      if (!userInfoStr) return;
      const userInfo = JSON.parse(userInfoStr);
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      };
      
      const payload = action === 'reject' ? { reason: 'Admin rejected application' } : {};
      
      await axios.put(`http://localhost:5000/api/admin/guides/${id}/${action}`, payload, config);
      
      // Remove guide from list
      setPendingGuides(pendingGuides.filter(g => g._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || `Error trying to ${action} guide`);
    }
  };

  if (loading) return <div>Loading pending guides...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-dashboard animate-fade-in">
      <h2 className="text-on-bg">Pending Guide Approvals</h2>
      
      {pendingGuides.length === 0 ? (
        <div className="glass-panel empty-state">
          <p>No pending guide applications at the moment.</p>
        </div>
      ) : (
        <div className="guides-grid">
          {pendingGuides.map(guide => (
            <div key={guide._id} className="guide-card glass-panel hover-lift">
              <div className="guide-header">
                {guide.profilePhoto && guide.profilePhoto.startsWith('data:application/pdf') ? (
                  <div className="pdf-placeholder" onClick={() => window.open(guide.profilePhoto)}>
                    <Check size={24} />
                    <span>View PDF</span>
                  </div>
                ) : (
                  <img src={guide.profilePhoto} alt={guide.name} className="guide-avatar" />
                )}
                <div>
                  <h3>{guide.name}</h3>
                  <p className="guide-location">{guide.city}</p>
                </div>
              </div>
              
              <div className="guide-details">
                <p><strong>Email:</strong> {guide.email}</p>
                <p><strong>Phone:</strong> {guide.phone}</p>
                <p><strong>Languages:</strong> {guide.languages.join(', ')}</p>
                <p><strong>Experience:</strong> {guide.experience}</p>
                <p><strong>Pricing:</strong> ₹{guide.pricePerHour}/hr</p>
              </div>

              <div className="guide-actions">
                <button className="btn-approve" onClick={() => handleAction(guide._id, 'approve')}>
                  <Check size={18} /> Approve
                </button>
                <button className="btn-reject" onClick={() => handleAction(guide._id, 'reject')}>
                  <X size={18} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
