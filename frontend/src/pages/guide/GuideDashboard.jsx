import React, { useState } from 'react';
import { useNavigate, Link, Routes, Route, useLocation } from 'react-router-dom';
import {
   LayoutDashboard, Calendar, IndianRupee, Users,
   MessageSquare, UserCircle, Settings, LogOut,
   CheckCircle, XCircle, Clock, TrendingUp, Home,
   ArrowRight, Search, Bell, Edit3, Trash2
} from 'lucide-react';
import './GuideDashboard.css';

const GuideDashboard = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
   const [isAvailable, setIsAvailable] = useState(true);

   const handleLogout = () => {
      localStorage.removeItem('userInfo');
      navigate('/login');
   };

   const isActive = (path) => location.pathname.includes(path) ? 'nav-link active' : 'nav-link';

   // Sub-components for different sections
   const Overview = () => (
      <div className="animate-fade-in">
         <div className="guide-stats-grid mb-4">
            <div className="stat-panel glass-panel">
               <div className="stat-icon bg-blue"><Users size={24} /></div>
               <div className="stat-info">
                  <span className="label">Monthly Requests</span>
                  <h2 className="value">24</h2>
               </div>
               <div className="stat-trend positive"><TrendingUp size={16} /> +12%</div>
            </div>
            <div className="stat-panel glass-panel">
               <div className="stat-icon bg-green"><IndianRupee size={24} /></div>
               <div className="stat-info">
                  <span className="label">Total Earnings</span>
                  <h2 className="value">₹18,200</h2>
               </div>
               <div className="stat-trend positive"><TrendingUp size={16} /> +5%</div>
            </div>
            <div className="stat-panel glass-panel">
               <div className="stat-icon bg-purple"><Calendar size={24} /></div>
               <div className="stat-info">
                  <span className="label">Active Trips</span>
                  <h2 className="value">3</h2>
               </div>
               <div className="stat-trend negative"><TrendingUp size={16} style={{ transform: 'rotate(180deg)' }} /> -2%</div>
            </div>
         </div>

         <div className="dashboard-grid-2">
            <section className="guide-section glass-panel">
               <div className="section-header">
                  <h3>Recent Booking Requests</h3>
                  <Link to="/guide-dashboard/bookings" className="text-link">View All</Link>
               </div>
               <div className="requests-stack">
                  {[
                     { id: 1, name: 'Alice Walker', place: 'Eiffel Tower', date: 'May 15', status: 'pending' },
                     { id: 2, name: 'Bob Smith', place: 'Louvre Museum', date: 'May 18', status: 'pending' }
                  ].map(req => (
                     <div key={req.id} className="request-item">
                        <div className="req-avatar">{req.name.charAt(0)}</div>
                        <div className="req-details">
                           <strong>{req.name}</strong>
                           <span>{req.place} • {req.date}</span>
                        </div>
                        <div className="req-actions">
                           <button className="btn-approve" title="Approve"><CheckCircle size={18} /></button>
                           <button className="btn-reject" title="Reject"><XCircle size={18} /></button>
                        </div>
                     </div>
                  ))}
               </div>
            </section>

            <section className="guide-section glass-panel">
               <div className="section-header">
                  <h3>Upcoming Schedule</h3>
                  <Link to="/guide-dashboard/schedule" className="text-link">Full Calendar</Link>
               </div>
               <div className="calendar-mini-preview">
                  <div className="schedule-item">
                     <div className="date-badge">12<span>MAY</span></div>
                     <div className="schedule-info">
                        <strong>Private Tour: Paris Highlights</strong>
                        <span>10:00 AM - 2:00 PM</span>
                     </div>
                  </div>
                  <div className="schedule-item">
                     <div className="date-badge">14<span>MAY</span></div>
                     <div className="schedule-info">
                        <strong>Walking Tour: Latin Quarter</strong>
                        <span>3:00 PM - 5:00 PM</span>
                     </div>
                  </div>
               </div>
            </section>
         </div>
      </div>
   );

   const Bookings = () => (
      <div className="guide-section glass-panel animate-fade-in">
         <div className="section-header">
            <h2>Manage Bookings</h2>
            <div className="filter-row">
               <button className="btn-filter active">All</button>
               <button className="btn-filter">Pending</button>
               <button className="btn-filter">Confirmed</button>
               <button className="btn-filter">Completed</button>
            </div>
         </div>
         <table className="bookings-table">
            <thead>
               <tr>
                  <th>Customer</th>
                  <th>Location</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {[
                  { id: 1, customer: 'John Doe', location: 'Paris Central', time: 'May 12, 10:00 AM', status: 'Confirmed' },
                  { id: 2, customer: 'Jane Smith', location: 'Versailles', time: 'May 14, 09:00 AM', status: 'Pending' },
                  { id: 3, customer: 'Mike Ross', location: 'Montmartre', time: 'May 10, 02:00 PM', status: 'Completed' }
               ].map(b => (
                  <tr key={b.id}>
                     <td className="user-td"><div className="avatar-sm">{b.customer.charAt(0)}</div> {b.customer}</td>
                     <td>{b.location}</td>
                     <td>{b.time}</td>
                     <td><span className={`status-pill ${b.status.toLowerCase()}`}>{b.status}</span></td>
                     <td>
                        <div className="table-actions">
                           {b.status === 'Pending' && <button className="btn-icon approve"><CheckCircle size={18} /></button>}
                           <button className="btn-icon edit"><Edit3 size={18} /></button>
                           <button className="btn-icon delete"><Trash2 size={18} /></button>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );

   const Earnings = () => (
      <div className="animate-fade-in">
         <div className="earnings-summary glass-panel mb-3">
            <div className="summary-card">
               <span>Total Earnings</span>
               <h2>₹45,600</h2>
               <p className="positive">+15% from last month</p>
            </div>
            <div className="summary-card">
               <span>Pending Payout</span>
               <h2>₹8,200</h2>
               <button className="btn-primary small">Withdraw</button>
            </div>
         </div>
         <div className="glass-panel p-4">
            <h3>Monthly Breakdown</h3>
            <div className="earnings-chart-placeholder">
               {/* Simple CSS Bar Chart */}
               <div className="chart-bars">
                  {[40, 70, 45, 90, 65, 80].map((h, i) => (
                     <div key={i} className="bar-container">
                        <div className="bar" style={{ height: `${h}%` }}></div>
                        <span>Month {i + 1}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );

   return (
      <div className="guide-dashboard animate-fade-in">
         <aside className="guide-sidebar">
            <div className="sidebar-header">
               <Link to="/home" className="logo-text">Guide<span className="text-blue">Portal</span></Link>
            </div>

            <nav className="guide-nav">
               <Link to="/home" className="nav-link"><Home size={20} /> Back to Home</Link>
               <div className="nav-divider"></div>
               <Link to="/guide-dashboard" className={location.pathname === '/guide-dashboard' || location.pathname === '/guide-dashboard/overview' ? 'nav-link active' : 'nav-link'}><LayoutDashboard size={20} /> Overview</Link>
               <Link to="/guide-dashboard/bookings" className={isActive('/bookings')}><Calendar size={20} /> Bookings</Link>
               <Link to="/guide-dashboard/earnings" className={isActive('/earnings')}><IndianRupee size={20} /> Earnings</Link>
               <Link to="/guide-dashboard/inquiries" className={isActive('/inquiries')}><MessageSquare size={20} /> Inquiries</Link>
               <div className="nav-divider"></div>
               <Link to="/guide-dashboard/profile" className={isActive('/profile')}><UserCircle size={20} /> Edit Profile</Link>
               <Link to="/guide-dashboard/settings" className={isActive('/settings')}><Settings size={20} /> Settings</Link>
               <button onClick={handleLogout} className="nav-link logout-btn"><LogOut size={20} /> Sign Out</button>
            </nav>
         </aside>

         <main className="guide-main">
            <header className="guide-topbar">
               <div className="topbar-left">
                  <h1>{location.pathname.split('/').pop().toUpperCase() || 'DASHBOARD'}</h1>
                  <p>Welcome back, {userInfo?.name}</p>
               </div>
               <div className="topbar-right">
                  <div className={`availability-toggle ${isAvailable ? 'online' : 'offline'}`} onClick={() => setIsAvailable(!isAvailable)}>
                     <div className="toggle-dot"></div>
                     <span>{isAvailable ? 'Available' : 'Busy'}</span>
                  </div>
                  <button className="icon-btn notification-btn"><Bell size={20} /><span className="badge"></span></button>
               </div>
            </header>

            <div className="content-area">
               <Routes>
                  <Route index element={<Overview />} />
                  <Route path="overview" element={<Overview />} />
                  <Route path="bookings" element={<Bookings />} />
                  <Route path="earnings" element={<Earnings />} />
                  <Route path="inquiries" element={<div className="glass-panel p-5 text-center"><h3>Messages Section</h3><p>Manage customer inquiries here.</p></div>} />
                  <Route path="profile" element={<div className="glass-panel p-5"><h3>Profile Management</h3><p>Update your guide bio and pricing.</p></div>} />
                  <Route path="settings" element={<div className="glass-panel p-5"><h3>Guide Settings</h3><p>Configure notifications and preferences.</p></div>} />
               </Routes>
            </div>
         </main>
      </div>
   );
};

export default GuideDashboard;
