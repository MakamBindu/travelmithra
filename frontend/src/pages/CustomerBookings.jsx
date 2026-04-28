import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, CreditCard, MessageCircle } from 'lucide-react';
import './Bookings.css';

const CustomerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      
      const { data } = await axios.get('http://localhost:5000/api/bookings/customer', config);
      setBookings(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch bookings');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <div>Loading bookings...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="bookings-dashboard animate-fade-in">
      <h2 className="text-on-bg">My Bookings</h2>
      
      {bookings.length === 0 ? (
        <div className="glass-panel empty-state">
          <p>You haven't made any bookings yet.</p>
        </div>
      ) : (
        <div className="bookings-grid">
          {bookings.map(booking => (
            <div key={booking._id} className="booking-card glass-panel hover-lift">
              <div className="booking-header">
                <div className="guide-info">
                  <img src={booking.guide.profilePhoto} alt={booking.guide.name} />
                  <div>
                    <h4>{booking.guide.name}</h4>
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
                {booking.specialRequest && (
                  <p className="special-req"><strong>Note:</strong> {booking.specialRequest}</p>
                )}
              </div>
              
              <div className="booking-footer">
                <div className="payment-info">
                  <p>Total: <strong>₹{booking.totalAmount}</strong></p>
                  <p className="payment-status"><CreditCard size={14}/> {booking.paymentStatus.toUpperCase()}</p>
                </div>
                <div className="action-buttons">
                  {booking.paymentStatus === 'pending' && booking.status !== 'rejected' && (
                    <button className="btn-secondary btn-sm">Pay Now</button>
                  )}
                  {(booking.status === 'accepted' || booking.status === 'completed') && (
                    <Link to={`/dashboard/chat/${booking._id}`} className="btn-primary btn-sm" style={{display:'flex', alignItems:'center', gap:'0.25rem'}}>
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

export default CustomerBookings;
