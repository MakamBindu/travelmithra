import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Check, X, CreditCard, MessageCircle } from 'lucide-react';
import './Bookings.css';

const GuideBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      
      const { data } = await axios.get('http://localhost:5000/api/bookings/guide', config);
      setBookings(data);
      
      // Calculate earnings (only for completed or paid bookings)
      const total = data.reduce((acc, curr) => {
        if (curr.paymentStatus === 'paid' || curr.paymentStatus === 'partial') {
          return acc + curr.advanceAmountPaid;
        }
        return acc;
      }, 0);
      setEarnings(total);
      
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch bookings');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      
      await axios.put(`http://localhost:5000/api/bookings/${id}/status`, { status }, config);
      fetchBookings(); // Refresh data
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating status');
    }
  };

  if (loading) return <div>Loading booking requests...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="bookings-dashboard animate-fade-in">
      <div className="dashboard-header-flex">
        <h2 className="text-on-bg">Booking Requests</h2>
        <div className="earnings-card glass-panel">
          <p>Total Earnings</p>
          <h3>₹{earnings}</h3>
        </div>
      </div>
      
      {bookings.length === 0 ? (
        <div className="glass-panel empty-state">
          <p>You don't have any booking requests yet.</p>
        </div>
      ) : (
        <div className="bookings-grid">
          {bookings.map(booking => (
            <div key={booking._id} className="booking-card glass-panel hover-lift">
              <div className="booking-header">
                <div className="guide-info">
                  <div className="avatar-placeholder">{booking.customer.name.charAt(0)}</div>
                  <div>
                    <h4>{booking.customer.name}</h4>
                    <p><MapPin size={14}/> {booking.city}</p>
                  </div>
                </div>
                <div className={`status-badge ${booking.status}`}>
                  {booking.status}
                </div>
              </div>
              
              <div className="booking-details">
                <p><Calendar size={16}/> {new Date(booking.date).toLocaleDateString()}</p>
                <p><Clock size={16}/> {booking.time} ({booking.durationHours} hrs)</p>
                <p><strong>People:</strong> {booking.numberOfPeople}</p>
                <p><strong>Contact:</strong> {booking.customer.phone}</p>
                {booking.specialRequest && (
                  <p className="special-req"><strong>Note:</strong> {booking.specialRequest}</p>
                )}
              </div>
              
              <div className="booking-footer">
                <div className="payment-info">
                  <p>Total: <strong>₹{booking.totalAmount}</strong></p>
                  <p className="payment-status"><CreditCard size={14}/> {booking.paymentStatus.toUpperCase()}</p>
                </div>
                
                {booking.status === 'pending' && (
                  <div className="action-buttons">
                    <button className="btn-approve btn-sm" onClick={() => handleStatusUpdate(booking._id, 'accepted')}><Check size={16}/></button>
                    <button className="btn-reject btn-sm" onClick={() => handleStatusUpdate(booking._id, 'rejected')}><X size={16}/></button>
                  </div>
                )}
                
                <div className="action-buttons">
                  {booking.status === 'accepted' && booking.paymentStatus !== 'pending' && (
                    <button className="btn-primary btn-sm" onClick={() => handleStatusUpdate(booking._id, 'completed')}>Mark Completed</button>
                  )}
                  {(booking.status === 'accepted' || booking.status === 'completed') && (
                    <Link to={`/dashboard/chat/${booking._id}`} className="btn-secondary btn-sm" style={{display:'flex', alignItems:'center', gap:'0.25rem'}}>
                      <MessageCircle size={14}/> Chat
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuideBookings;
