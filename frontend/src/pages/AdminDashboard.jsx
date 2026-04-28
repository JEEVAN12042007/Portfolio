import React, { useState, useEffect } from 'react';
import { Users, FileText, BarChart3, Search, Filter, CheckCircle, Clock, Star, ChevronRight, LogOut, ShieldCheck, Settings, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const API_BASE = "http://localhost:8080/api";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [adminTab, setAdminTab] = useState('submissions');

  useEffect(() => { fetchSubmissions(); }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    try { const res = await fetch(`${API_BASE}/projects`); if (res.ok) setSubmissions(await res.json()); }
    catch (err) { console.error("Failed to fetch", err); }
    finally { setLoading(false); }
  };

  const handleReview = async (id) => {
    if (!rating || !feedback) { alert("Please provide both a rating and feedback."); return; }
    try {
      const res = await fetch(`${API_BASE}/projects/${id}/review?rating=${rating}&feedback=${encodeURIComponent(feedback)}`, { method: 'POST' });
      if (res.ok) { fetchSubmissions(); setSelectedProject(null); setFeedback(''); setRating(0); }
    } catch (err) { console.error("Review failed", err); }
  };

  const Sidebar = () => (
    <div className="glass-card-static" style={{ width: '250px', height: 'calc(100vh - 32px)', margin: '16px', padding: '24px 14px', position: 'fixed', zIndex: 100, display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius-xl)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '36px', padding: '0 10px' }}>
        <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--secondary), var(--secondary-light))', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(245,158,11,0.3)' }}>
          <ShieldCheck size={16} color="var(--background)" />
        </div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', fontFamily: "'Space Grotesk', sans-serif" }} className="gradient-text">Admin Panel</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <NavLabel>Oversight</NavLabel>
        <NavItem icon={<FileText size={17} />} label="Submissions" active={adminTab === 'submissions'} onClick={() => setAdminTab('submissions')} />
        <NavItem icon={<Users size={17} />} label="Student Registry" active={adminTab === 'registry'} onClick={() => setAdminTab('registry')} />
        <NavItem icon={<BarChart3 size={17} />} label="Analytics" active={adminTab === 'analytics'} onClick={() => setAdminTab('analytics')} />
        <NavLabel style={{ marginTop: '16px' }}>Management</NavLabel>
        <NavItem icon={<ShieldCheck size={17} />} label="Faculty Team" active={adminTab === 'faculty'} onClick={() => setAdminTab('faculty')} />
        <NavItem icon={<FileText size={17} />} label="Export Reports" active={adminTab === 'reports'} onClick={() => setAdminTab('reports')} />
        <NavItem icon={<Settings size={17} />} label="Portal Settings" active={adminTab === 'settings'} onClick={() => setAdminTab('settings')} />
      </div>

      <div style={{ marginTop: 'auto' }}>
        <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '0.62rem', color: 'var(--text-dim)', marginBottom: '3px', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '1px' }}>Administrator</p>
          <p style={{ fontWeight: '700', fontSize: '0.82rem' }}>{user?.firstName} {user?.lastName}</p>
        </div>
        <button onClick={logout} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--rose)', background: 'rgba(244,63,94,0.05)', fontWeight: '700', border: '1px solid rgba(244,63,94,0.1)', fontSize: '0.78rem', cursor: 'pointer' }}>
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)', color: 'var(--text-main)' }}>
      <Sidebar />
      <main style={{ marginLeft: '282px', flex: 1, padding: '36px 40px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px' }} className="fade-in">
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '6px', letterSpacing: '-0.5px' }} className="gradient-text">Review Dashboard</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              Monitoring <span style={{ color: 'var(--text-main)', fontWeight: '700' }}>{submissions.length}</span> portfolios
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} size={15} color="var(--text-dim)" />
              <input placeholder="Search projects..." style={{ padding: '9px 14px 9px 36px', width: '220px' }} />
            </div>
            <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', fontSize: '0.82rem' }}>
              <Filter size={13} /> Filter
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '28px' }} className="fade-in">
          <StatCard label="Total Projects" value={submissions.length} color="var(--primary)" />
          <StatCard label="Pending Review" value={submissions.filter(s => s.status === 'PENDING').length} color="var(--secondary)" />
          <StatCard label="Reviewed" value={submissions.filter(s => s.status === 'REVIEWED').length} color="var(--accent)" />
        </div>

        {/* Table */}
        <div className="glass-card-static fade-in" style={{ padding: '0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
                {['Student', 'Project', 'Status', 'Score', 'Action'].map(h => (
                  <th key={h} style={{ padding: '14px 24px', fontWeight: '700', color: 'var(--text-dim)', textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '1px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {submissions.length > 0 ? submissions.map(project => (
                <tr key={project.id} style={{ borderBottom: '1px solid var(--border)' }} className="table-row">
                  <td style={{ padding: '14px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--primary-dark), var(--accent))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.75rem' }}>
                        {project.student?.firstName?.[0] || 'S'}
                      </div>
                      <div>
                        <p style={{ fontWeight: '600', fontSize: '0.85rem' }}>{project.student?.firstName} {project.student?.lastName}</p>
                        <p style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>ID: {project.student?.id}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 24px', fontWeight: '600', fontSize: '0.85rem' }}>{project.title}</td>
                  <td style={{ padding: '14px 24px' }}>
                    <span className={`badge ${project.status === 'REVIEWED' ? 'badge-success' : 'badge-warning'}`}>
                      {project.status === 'REVIEWED' ? <CheckCircle size={11} /> : <Clock size={11} />} {project.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 24px' }}>
                    {project.rating > 0 ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--secondary)' }}>
                        <Star size={13} fill="var(--secondary)" /> <span style={{ fontWeight: '800', fontSize: '0.88rem' }}>{project.rating.toFixed(1)}</span>
                      </div>
                    ) : <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>—</span>}
                  </td>
                  <td style={{ padding: '14px 24px' }}>
                    <button onClick={() => setSelectedProject(project)} className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                      Assess <ChevronRight size={13} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '48px', color: 'var(--text-dim)' }}>No student projects found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Review Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }} className="glass-card-static" style={{ width: '100%', maxWidth: '640px', padding: '44px', background: 'var(--surface-light)', border: '1px solid var(--glass-hover)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', marginBottom: '6px' }} className="gradient-text">Project Assessment</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Reviewing: <span style={{ color: 'white', fontWeight: '600' }}>{selectedProject.title}</span></p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Student</p>
                  <p style={{ fontWeight: '700', fontSize: '0.9rem' }}>{selectedProject.student?.firstName} {selectedProject.student?.lastName}</p>
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', marginBottom: '14px', fontWeight: '700', fontSize: '0.82rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>Proficiency Score</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {[1, 2, 3, 4, 5].map(s => (
                    <button key={s} onClick={() => setRating(s)} style={{ flex: 1, padding: '16px', borderRadius: 'var(--radius-md)', border: '2px solid', borderColor: rating === s ? 'var(--primary)' : 'var(--border)', background: rating === s ? 'rgba(124,92,252,0.12)' : 'var(--surface)', color: rating === s ? 'white' : 'var(--text-muted)', fontWeight: '800', fontSize: '1.2rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', marginBottom: '12px', fontWeight: '700', fontSize: '0.82rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>Professional Feedback</label>
                <textarea rows="5" value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Provide comprehensive feedback..." style={{ width: '100%', fontFamily: 'inherit', lineHeight: '1.6' }} />
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <button onClick={() => setSelectedProject(null)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                <button onClick={() => handleReview(selectedProject.id)} className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.95rem' }}>Publish Review</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* Sub-Components */
const NavLabel = ({ children, style }) => <p style={{ fontSize: '0.62rem', color: 'var(--text-dim)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.2px', margin: '12px 0 6px 10px', ...style }}>{children}</p>;

const NavItem = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '11px 14px', borderRadius: 'var(--radius-md)', width: '100%', border: 'none', textAlign: 'left', cursor: 'pointer', background: active ? 'rgba(124,92,252,0.1)' : 'transparent', color: active ? 'white' : 'var(--text-muted)', fontWeight: active ? '600' : '500', fontSize: '0.84rem', borderLeft: active ? '3px solid var(--secondary)' : '3px solid transparent', transition: 'all 0.15s' }}>
    {icon} {label}
  </button>
);

const StatCard = ({ label, value, color }) => (
  <div className="glass-card-static" style={{ padding: '20px 24px' }}>
    <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>{label}</p>
    <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color }}>{value}</h3>
  </div>
);

export default AdminDashboard;
