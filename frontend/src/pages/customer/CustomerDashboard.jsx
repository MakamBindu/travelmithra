import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  Search, Heart, Calendar, Clock, MapPin, 
  MessageSquare, Star, ArrowRight, User, Settings, LogOut, Home,
  TrendingUp, Bell, Compass, X, Lock, Shield, CreditCard, 
  Globe, Trash2, Camera, Save, Moon, Sun, ChevronRight
} from 'lucide-react';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
  const path = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const isActive = (route) => path === route ? 'nav-link active' : 'nav-link';

  const renderContent = () => {
    // 1. My Bookings View
    if (path.includes('/bookings')) {
      return (
        <div className="dashboard-content p-4 animate-fade-in">
          <div className="section-header">
            <h2 className="text-on-bg">My Bookings</h2>
            <p className="text-light">Manage your upcoming and past travel experiences.</p>
          </div>
          
          <div className="bookings-container mt-3">
             <div className="glass-panel p-4 text-center empty-booking-state">
                <div className="empty-icon-bg">
                  <Calendar size={48} />
                </div>
                <h3>No upcoming bookings yet</h3>
                <p>Start exploring beautiful cities and connect with local guides.</p>
                <button className="btn-primary mt-2" onClick={() => navigate('/book')}>
                  Plan Your First Trip <ArrowRight size={18}/>
                </button>
             </div>
          </div>
        </div>
      );
    }

    // 2. Wishlist View
    if (path.includes('/wishlist')) {
      return (
        <div className="dashboard-content p-4 animate-fade-in">
          <div className="section-header">
            <h2 className="text-on-bg">My Wishlist</h2>
            <p className="text-light">Your curated collection of dreamy destinations.</p>
          </div>
          
          <div className="wishlist-grid mt-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="wishlist-card glass-panel">
                 <div className="card-image-container">
                    <img src={`https://images.unsplash.com/photo-${1500000000000 + (i*100)}?auto=format&fit=crop&w=600&h=400&q=80`} alt="Saved Spot" />
                    <button className="remove-wishlist-btn" title="Remove from wishlist"><X size={16}/></button>
                 </div>
                 <div className="card-body">
                    <h4>Scenic Paradise {i}</h4>
                    <p><MapPin size={14}/> Global Destination</p>
                    <div className="card-footer">
                       <span className="rating"><Star size={14} fill="#fbbf24"/> 4.9</span>
                       <button className="btn-link-small" onClick={() => navigate('/book')}>Book Now</button>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 3. Messages View
    if (path.includes('/messages')) {
      return (
        <div className="dashboard-content p-4 animate-fade-in">
          <div className="section-header">
            <h2 className="text-on-bg">Messages</h2>
            <p className="text-light">Chat with your guides and get local insights.</p>
          </div>
          <div className="glass-panel p-5 text-center mt-3">
            <MessageSquare size={64} color="var(--primary-blue)" style={{ opacity: 0.5, margin: '0 auto 1.5rem auto' }} />
            <h3>Your Inbox is Empty</h3>
            <p className="text-light mt-1">When you contact guides, your conversations will appear here.</p>
            <button className="btn-secondary mt-2" onClick={() => navigate('/book')}>Find a Guide</button>
          </div>
        </div>
      );
    }

    // 4. Enhanced Settings View
    if (path.includes('/settings')) {
      return (
        <div className="dashboard-content p-4 animate-fade-in">
          <div className="section-header">
            <h2 className="text-on-bg">Settings</h2>
            <p className="text-light">Customize your TravelMithra experience.</p>
          </div>

          <div className="settings-scroll-area">
            {/* 1. Profile Settings */}
            <section className="settings-card glass-panel">
               <div className="card-header">
                  <div className="icon-box"><User size={20}/></div>
                  <h3>Profile Settings</h3>
               </div>
               <div className="profile-upload-area">
                  <div className="avatar-big">{userInfo?.name?.charAt(0)}</div>
                  <button className="btn-glass small"><Camera size={16}/> Change Photo</button>
               </div>
               <div className="settings-form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" defaultValue={userInfo?.name} />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" defaultValue={userInfo?.email} disabled />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" defaultValue={userInfo?.phone || '+91 9876543210'} />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input type="text" defaultValue={userInfo?.city || 'Bangalore, India'} />
                  </div>
                  <div className="form-group full-width">
                    <label>Short Bio</label>
                    <textarea placeholder="Tell guides a bit about your travel style..."></textarea>
                  </div>
               </div>
               <button className="btn-primary mt-2"><Save size={18}/> Save Profile</button>
            </section>

            {/* 2. Security Settings */}
            <section className="settings-card glass-panel">
               <div className="card-header">
                  <div className="icon-box"><Lock size={20}/></div>
                  <h3>Security</h3>
               </div>
               <div className="settings-form-grid">
                  <div className="form-group">
                    <label>Current Password</label>
                    <input type="password" placeholder="••••••••" />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input type="password" />
                  </div>
               </div>
               <div className="toggle-setting mt-2">
                  <div className="toggle-text">
                     <strong>Two-Factor Authentication</strong>
                     <p>Add an extra layer of security to your account.</p>
                  </div>
                  <label className="switch">
                     <input type="checkbox" />
                     <span className="slider round"></span>
                  </label>
               </div>
            </section>

            {/* 3. Notification Settings */}
            <section className="settings-card glass-panel">
               <div className="card-header">
                  <div className="icon-box"><Bell size={20}/></div>
                  <h3>Notifications</h3>
               </div>
               <div className="toggle-list">
                  <div className="toggle-setting">
                     <span>Booking Confirmations</span>
                     <label className="switch"><input type="checkbox" defaultChecked /><span className="slider round"></span></label>
                  </div>
                  <div className="toggle-setting">
                     <span>Booking Reminders</span>
                     <label className="switch"><input type="checkbox" defaultChecked /><span className="slider round"></span></label>
                  </div>
                  <div className="toggle-setting">
                     <span>Messages from Guides</span>
                     <label className="switch"><input type="checkbox" defaultChecked /><span className="slider round"></span></label>
                  </div>
                  <div className="toggle-setting">
                     <span>Promotional Notifications</span>
                     <label className="switch"><input type="checkbox" /><span className="slider round"></span></label>
                  </div>
                  <div className="toggle-setting border-top mt-1 pt-1">
                     <strong>Email Notifications</strong>
                     <label className="switch"><input type="checkbox" defaultChecked /><span className="slider round"></span></label>
                  </div>
               </div>
            </section>

            {/* 4. Travel Preferences */}
            <section className="settings-card glass-panel">
               <div className="card-header">
                  <div className="icon-box"><Compass size={20}/></div>
                  <h3>Travel Preferences</h3>
               </div>
               <div className="settings-form-grid">
                  <div className="form-group">
                    <label>Travel Type</label>
                    <select>
                       <option>Solo Traveler</option>
                       <option>Family</option>
                       <option>Group / Friends</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Budget Range</label>
                    <select>
                       <option>Low (Backpacker)</option>
                       <option>Medium (Comfort)</option>
                       <option>High (Luxury)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Preferred Language</label>
                    <select>
                       <option>English</option>
                       <option>Hindi</option>
                       <option>French</option>
                    </select>
                  </div>
               </div>
               <div className="interest-tags mt-2">
                  <label className="block mb-1">Interests</label>
                  <div className="flex-wrap gap-1">
                     <span className="tag active">Historical</span>
                     <span className="tag active">Food</span>
                     <span className="tag">Adventure</span>
                     <span className="tag">Nature</span>
                     <span className="tag">Photography</span>
                  </div>
               </div>
            </section>

            {/* 5. Payment Settings */}
            <section className="settings-card glass-panel">
               <div className="card-header">
                  <div className="icon-box"><CreditCard size={20}/></div>
                  <h3>Payment Methods</h3>
               </div>
               <div className="mock-card mt-2">
                  <div className="card-top">
                     <CreditCard size={24}/>
                     <span>Visa •••• 4242</span>
                  </div>
                  <p>Last used: 2 days ago</p>
               </div>
               <button className="btn-secondary mt-2 small"><Plus size={16}/> Add New Card</button>
            </section>

            {/* 6. Privacy & Appearance */}
            <div className="settings-split-row">
               <section className="settings-card glass-panel">
                  <div className="card-header">
                     <div className="icon-box"><Shield size={20}/></div>
                     <h3>Privacy</h3>
                  </div>
                  <div className="toggle-list small">
                     <div className="toggle-setting">
                        <span>Show profile to guides</span>
                        <label className="switch"><input type="checkbox" defaultChecked /><span className="slider round"></span></label>
                     </div>
                     <div className="toggle-setting">
                        <span>Share contact after booking</span>
                        <label className="switch"><input type="checkbox" defaultChecked /><span className="slider round"></span></label>
                     </div>
                  </div>
               </section>
               <section className="settings-card glass-panel">
                  <div className="card-header">
                     <div className="icon-box"><Moon size={20}/></div>
                     <h3>Appearance</h3>
                  </div>
                  <div className="appearance-toggle">
                     <button className="theme-btn active"><Sun size={18}/> Light</button>
                     <button className="theme-btn"><Moon size={18}/> Dark</button>
                  </div>
               </section>
            </div>

            {/* 7. Activity & Actions */}
            <section className="settings-card glass-panel">
               <div className="card-header">
                  <div className="icon-box"><TrendingUp size={20}/></div>
                  <h3>Account Actions</h3>
               </div>
               <div className="actions-list">
                  <button className="action-row-btn" onClick={() => navigate('/customer-dashboard/bookings')}>
                     <Clock size={18}/> <span>View Booking History</span> <ChevronRight size={18}/>
                  </button>
                  <button className="action-row-btn logout" onClick={handleLogout}>
                     <LogOut size={18}/> <span>Logout</span>
                  </button>
                  <button className="action-row-btn danger" onClick={() => alert('Confirm account deletion?')}>
                     <Trash2 size={18}/> <span>Delete Account</span>
                  </button>
               </div>
            </section>
          </div>
        </div>
      );
    }

    // 5. Default Overview View
    return (
      <div className="dashboard-content animate-fade-in">
        {/* Top Welcome Section */}
        <header className="dashboard-hero">
           <div className="hero-text">
             <span className="welcome-badge">Welcome Back!</span>
             <h1 className="text-on-bg">Where to next, {userInfo?.name?.split(' ')[0]}?</h1>
             <p className="text-light">Discover personalized experiences and local hidden gems.</p>
           </div>
           <div className="quick-stats">
              <div className="stat-pill glass-panel">
                 <Calendar size={20} className="text-blue"/>
                 <div className="stat-info">
                   <span className="stat-val">0</span>
                   <span className="stat-label">Total Bookings</span>
                 </div>
              </div>
              <div className="stat-pill glass-panel">
                 <Clock size={20} className="text-purple"/>
                 <div className="stat-info">
                   <span className="stat-val">0</span>
                   <span className="stat-label">Upcoming Trips</span>
                 </div>
              </div>
              <div className="stat-pill glass-panel">
                 <Heart size={20} className="text-pink"/>
                 <div className="stat-info">
                   <span className="stat-val">12</span>
                   <span className="stat-label">Saved Places</span>
                 </div>
              </div>
           </div>
        </header>

        <div className="dashboard-grid">
           <div className="dashboard-main-col">
              {/* Upcoming Bookings Section */}
              <section className="dashboard-section">
                 <div className="section-header-row">
                    <h3><Calendar size={20}/> Upcoming Bookings</h3>
                    <Link to="/customer-dashboard/bookings" className="view-all">View All</Link>
                 </div>
                 <div className="booking-card-featured glass-panel">
                    <div className="empty-state-compact">
                       <Compass size={48} className="text-blue opacity-50"/>
                       <p>You have no upcoming trips scheduled.</p>
                       <button className="btn-primary small" onClick={() => navigate('/book')}>Explore Now</button>
                    </div>
                 </div>
              </section>

              {/* Quick Actions */}
              <section className="dashboard-section mt-3">
                 <h3><TrendingUp size={20}/> Quick Actions</h3>
                 <div className="quick-actions-row">
                    <div className="action-item glass-panel" onClick={() => navigate('/book')}>
                       <div className="action-icon bg-blue"><Search size={24}/></div>
                       <span>Find a Guide</span>
                    </div>
                    <div className="action-item glass-panel" onClick={() => navigate('/book')}>
                       <div className="action-icon bg-purple"><Calendar size={24}/></div>
                       <span>Plan a Trip</span>
                    </div>
                    <div className="action-item glass-panel" onClick={() => navigate('/explore')}>
                       <div className="action-icon bg-emerald"><Star size={24}/></div>
                       <span>Top Rated</span>
                    </div>
                 </div>
              </section>

              {/* Recommended Places */}
              <section className="dashboard-section mt-3">
                 <h3><Star size={20}/> Recommended for You</h3>
                 <div className="recommendations-scroll">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="rec-card glass-panel" onClick={() => navigate('/book')}>
                         <img src={`https://images.unsplash.com/photo-${1500000000000 + (i*500)}?auto=format&fit=crop&w=400&h=250&q=80`} alt="Recommended" />
                         <div className="rec-info">
                            <h4>Boutique Stay {i}</h4>
                            <span><MapPin size={12}/> Tokyo, Japan</span>
                         </div>
                      </div>
                    ))}
                 </div>
              </section>
           </div>

           <div className="dashboard-side-col">
              {/* Notifications Preview */}
              <section className="dashboard-section">
                 <div className="section-header-row">
                    <h3><Bell size={20}/> Notifications</h3>
                 </div>
                 <div className="notifications-list glass-panel">
                    <div className="notif-item unread">
                       <div className="notif-dot"></div>
                       <p>Welcome to TravelMithra! Start your journey by finding a local guide.</p>
                       <span>2 hours ago</span>
                    </div>
                    <div className="notif-item">
                       <p>Your profile is 80% complete. Add a photo to get more personalized matches.</p>
                       <span>Yesterday</span>
                    </div>
                 </div>
              </section>

              {/* Recent Activity */}
              <section className="dashboard-section mt-3">
                 <h3><Clock size={20}/> Recent Activity</h3>
                 <div className="activity-list glass-panel">
                    <div className="activity-item">
                       <Heart size={16} className="text-pink"/>
                       <p>You saved <strong>Eiffel Tower</strong> to wishlist.</p>
                    </div>
                    <div className="activity-item">
                       <Search size={16} className="text-blue"/>
                       <p>You searched for guides in <strong>Tokyo</strong>.</p>
                    </div>
                 </div>
              </section>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="customer-dashboard animate-fade-in">
      {/* Sidebar - Modern Dark Style */}
      <aside className="customer-sidebar">
        <div className="sidebar-logo">
          <Link to="/home">
            <span className="logo-text">Travel<span className="text-blue">Mithra</span></span>
          </Link>
        </div>
        
        <nav className="customer-nav">
          <Link to="/home" className="nav-link"><Home size={20}/> Home</Link>
          <div className="nav-label">Main Menu</div>
          <Link to="/customer-dashboard" className={isActive('/customer-dashboard')}><Search size={20}/> Overview</Link>
          <Link to="/customer-dashboard/bookings" className={isActive('/customer-dashboard/bookings')}><Calendar size={20}/> Bookings</Link>
          <Link to="/customer-dashboard/wishlist" className={isActive('/customer-dashboard/wishlist')}><Heart size={20}/> Wishlist</Link>
          <Link to="/customer-dashboard/messages" className={isActive('/customer-dashboard/messages')}><MessageSquare size={20}/> Messages</Link>
          
          <div className="nav-label">Preferences</div>
          <Link to="/customer-dashboard/settings" className={isActive('/customer-dashboard/settings')}><Settings size={20}/> Settings</Link>
          <button onClick={handleLogout} className="nav-link logout-btn"><LogOut size={20}/> Logout</button>
        </nav>

        <div className="sidebar-user-card glass-panel">
           <div className="user-avatar">{userInfo?.name?.charAt(0)}</div>
           <div className="user-meta">
              <strong>{userInfo?.name}</strong>
              <span>Traveler</span>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="customer-main">
        {renderContent()}
      </main>
    </div>
  );
};

export default CustomerDashboard;
