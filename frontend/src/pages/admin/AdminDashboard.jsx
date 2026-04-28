import React, { useState } from 'react';
import { useNavigate, Link, Routes, Route, useLocation } from 'react-router-dom';
import { 
  Shield, Users, Map, BarChart3, AlertCircle, 
  Settings, LogOut, Check, X, Search, MoreVertical, Home,
  FileCheck, MapPin, Star, Bell, Plus, Edit2, Trash2,
  Lock, Moon, MessageSquare
} from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const isActive = (path) => location.pathname.includes(path) ? 'nav-link active' : 'nav-link';

  // Sub-components
  const Overview = () => (
    <div className="animate-fade-in">
      <div className="admin-stats-row">
        <div className="admin-stat-card glass-panel">
          <div className="stat-header">
            <Users size={20} className="text-blue" />
            <span className="badge-up">+14%</span>
          </div>
          <span className="label">Total Users</span>
          <h2>1,240</h2>
        </div>
        <div className="admin-stat-card glass-panel">
          <div className="stat-header">
            <Shield size={20} className="text-green" />
            <span className="badge-up">+8%</span>
          </div>
          <span className="label">Total Guides</span>
          <h2>156</h2>
        </div>
        <div className="admin-stat-card glass-panel">
          <div className="stat-header">
            <FileCheck size={20} className="text-amber" />
            <span className="badge-warning">12 Pending</span>
          </div>
          <span className="label">Guide Requests</span>
          <h2>42</h2>
        </div>
        <div className="admin-stat-card glass-panel">
          <div className="stat-header">
            <Map size={20} className="text-purple" />
            <span className="badge-up">+22%</span>
          </div>
          <span className="label">Total Bookings</span>
          <h2>3,842</h2>
        </div>
      </div>

      <div className="admin-grid-2 mt-3">
         <section className="admin-section glass-panel">
            <div className="section-header">
               <h3>Recent Guide Applications</h3>
               <Link to="/admin-dashboard/approvals" className="text-link">View All</Link>
            </div>
            <div className="approval-stack">
               {[
                 { id: 1, name: 'Rahul Varma', city: 'Mumbai', exp: '3 yrs' },
                 { id: 2, name: 'Sanya Mirza', city: 'Hyderabad', exp: '1 yr' }
               ].map(g => (
                 <div key={g.id} className="approval-item">
                    <div className="item-info">
                       <strong>{g.name}</strong>
                       <span>{g.city} • {g.exp} Experience</span>
                    </div>
                    <div className="item-actions">
                       <button className="btn-approve"><Check size={18}/></button>
                       <button className="btn-reject"><X size={18}/></button>
                    </div>
                 </div>
               ))}
            </div>
         </section>

         <section className="admin-section glass-panel">
            <div className="section-header">
               <h3>Platform Activity</h3>
               <Link to="/admin-dashboard/bookings" className="text-link">Real-time Feed</Link>
            </div>
            <div className="activity-feed">
               <div className="feed-item">
                  <div className="feed-icon bg-blue"><Users size={14}/></div>
                  <div className="feed-text"><strong>New User</strong> signed up from Delhi</div>
                  <span className="time">5m ago</span>
               </div>
               <div className="feed-item">
                  <div className="feed-icon bg-green"><MapPin size={14}/></div>
                  <div className="feed-text"><strong>New Booking</strong> for Eiffel Tower</div>
                  <span className="time">12m ago</span>
               </div>
            </div>
         </section>
      </div>
    </div>
  );

  const UsersList = () => (
    <div className="admin-section glass-panel animate-fade-in">
       <div className="section-header">
          <h2>User Management</h2>
          <div className="action-row">
             <div className="table-search">
                <Search size={16}/>
                <input type="text" placeholder="Search by name or email..." />
             </div>
             <button className="btn-primary small"><Plus size={16}/> Add User</button>
          </div>
       </div>
       <table className="admin-table">
          <thead>
             <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
             </tr>
          </thead>
          <tbody>
             {[
               { id: 1, name: 'Amit Kumar', email: 'amit@example.com', role: 'Customer', status: 'Active' },
               { id: 2, name: 'Priya Singh', email: 'priya@guide.com', role: 'Guide', status: 'Active' },
               { id: 3, name: 'John Doe', email: 'john@blocked.com', role: 'Customer', status: 'Blocked' }
             ].map(u => (
               <tr key={u.id}>
                  <td>
                     <div className="user-info-cell">
                        <div className="avatar-sm">{u.name.charAt(0)}</div>
                        <div>
                           <strong>{u.name}</strong>
                           <p>{u.email}</p>
                        </div>
                     </div>
                  </td>
                  <td><span className={`role-badge ${u.role.toLowerCase()}`}>{u.role}</span></td>
                  <td><span className={`status-dot ${u.status.toLowerCase()}`}></span> {u.status}</td>
                  <td>Oct 12, 2023</td>
                  <td>
                     <div className="table-actions">
                        <button className="btn-icon edit"><Edit2 size={16}/></button>
                        <button className="btn-icon delete"><Trash2 size={16}/></button>
                     </div>
                  </td>
               </tr>
             ))}
          </tbody>
       </table>
    </div>
  );

  return (
    <div className="admin-dashboard animate-fade-in">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <Shield size={28} className="text-blue" />
          <h2 className="logo-text">Admin<span className="text-blue">Core</span></h2>
        </div>
        
        <nav className="admin-nav">
          <Link to="/home" className="nav-link"><Home size={20}/> Back to Home</Link>
          <div className="nav-divider"></div>
          <Link to="/admin-dashboard" className={location.pathname === '/admin-dashboard' || location.pathname === '/admin-dashboard/overview' ? 'nav-link active' : 'nav-link'}><BarChart3 size={20}/> Overview</Link>
          <Link to="/admin-dashboard/approvals" className={isActive('/approvals')}><FileCheck size={20}/> Guide Approvals</Link>
          <Link to="/admin-dashboard/users" className={isActive('/users')}><Users size={20}/> User Management</Link>
          <Link to="/admin-dashboard/bookings" className={isActive('/bookings')}><Map size={20}/> Bookings</Link>
          <Link to="/admin-dashboard/content" className={isActive('/content')}><MapPin size={20}/> Places & Data</Link>
          <Link to="/admin-dashboard/reviews" className={isActive('/reviews')}><Star size={20}/> Reviews</Link>
          <div className="nav-divider"></div>
          <Link to="/admin-dashboard/notifications" className={isActive('/notifications')}><Bell size={20}/> System Alerts</Link>
          <Link to="/admin-dashboard/settings" className={isActive('/settings')}><Settings size={20}/> Settings</Link>
          <button onClick={handleLogout} className="nav-link logout-btn"><LogOut size={20}/> Logout</button>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
           <div className="topbar-search glass-panel">
              <Search size={18}/>
              <input type="text" placeholder="Quick search platform..." />
           </div>
           <div className="topbar-right">
              <div className="admin-profile-pill">
                 <div className="admin-avatar">A</div>
                 <span>System Admin</span>
              </div>
           </div>
        </header>

        <div className="admin-content-area">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="overview" element={<Overview />} />
            <Route path="approvals" element={<div className="glass-panel p-5"><h2>Guide Approvals</h2><p>Review and approve new guide applications.</p></div>} />
            <Route path="users" element={<UsersList />} />
            <Route path="bookings" element={<div className="glass-panel p-5"><h2>Platform Bookings</h2><p>Monitor all transactions and bookings.</p></div>} />
            <Route path="content" element={<div className="glass-panel p-5"><h2>Content Management</h2><p>Manage cities, places, hotels, and restaurants.</p></div>} />
            <Route path="reviews" element={<div className="glass-panel p-5"><h2>Reviews Management</h2><p>Monitor and moderate user feedback.</p></div>} />
            <Route path="notifications" element={<div className="glass-panel p-5"><h2>System Notifications</h2><p>Send platform-wide announcements.</p></div>} />
            <Route path="settings" element={<div className="glass-panel p-5"><h2>System Settings</h2><p>Configure core platform parameters.</p></div>} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
