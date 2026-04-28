import React, { useState, useEffect } from 'react';
import { LayoutDashboard, PlusCircle, Trophy, MessageSquare, LogOut, ExternalLink, Star, Briefcase, Zap, Award, FileText, Users, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const API_BASE = "http://localhost:8080/api";

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (user?.id) fetchProjects(); }, [user]);

  const fetchProjects = async () => {
    setLoading(true);
    try { const res = await fetch(`${API_BASE}/projects/student/${user.id}`); if (res.ok) setProjects(await res.json()); }
    catch (err) { console.error("Failed to fetch projects", err); }
    finally { setLoading(false); }
  };

  const Sidebar = () => (
    <div className="glass-card-static" style={{ width: '250px', height: 'calc(100vh - 32px)', margin: '16px', padding: '24px 14px', position: 'fixed', zIndex: 100, display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius-xl)' }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '36px', padding: '0 10px' }}>
        <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--primary), var(--accent))', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(124,92,252,0.3)' }}>
          <Layers size={16} color="white" />
        </div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', fontFamily: "'Space Grotesk', sans-serif" }} className="gradient-text">PortfolioHub</h3>
      </div>

      {/* Nav */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <NavLabel>Main Menu</NavLabel>
        <NavItem icon={<LayoutDashboard size={17} />} label="My Projects" active={activeTab === 'portfolio'} onClick={() => setActiveTab('portfolio')} />
        <NavItem icon={<PlusCircle size={17} />} label="Upload New" active={activeTab === 'upload'} onClick={() => setActiveTab('upload')} />
        <NavItem icon={<MessageSquare size={17} />} label="Feedback" active={activeTab === 'feedback'} onClick={() => setActiveTab('feedback')} />
        <NavLabel style={{ marginTop: '16px' }}>Career & Growth</NavLabel>
        <NavItem icon={<Award size={17} />} label="Certifications" active={activeTab === 'certs'} onClick={() => setActiveTab('certs')} />
        <NavItem icon={<FileText size={17} />} label="Resume Builder" active={activeTab === 'resume'} onClick={() => setActiveTab('resume')} />
        <NavItem icon={<Users size={17} />} label="Student Network" active={activeTab === 'network'} onClick={() => setActiveTab('network')} />
        <NavItem icon={<Zap size={17} />} label="Skills Map" active={activeTab === 'skills'} onClick={() => setActiveTab('skills')} />
      </div>

      {/* Profile & Logout */}
      <div style={{ marginTop: 'auto' }}>
        <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: 'white', fontSize: '0.8rem' }}>
              {user?.firstName?.[0] || 'U'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontSize: '0.82rem', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.firstName} {user?.lastName}</p>
              <p style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>Student Account</p>
            </div>
          </div>
        </div>
        <button onClick={logout} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--rose)', background: 'rgba(244,63,94,0.05)', fontWeight: '700', border: '1px solid rgba(244,63,94,0.1)', fontSize: '0.78rem', cursor: 'pointer' }}>
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', background: 'var(--background)', color: 'var(--text-main)', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ marginLeft: '282px', flex: 1, padding: '36px 40px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px' }} className="fade-in">
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '6px', letterSpacing: '-0.5px' }} className="gradient-text">
              {activeTab === 'portfolio' ? 'My Projects' : activeTab === 'upload' ? 'Submit Project' : activeTab === 'skills' ? 'Skills Matrix' : activeTab === 'certs' ? 'Certifications' : activeTab === 'resume' ? 'Resume Builder' : activeTab === 'network' ? 'Peer Network' : 'Faculty Feedback'}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Showcase your best engineering and creative work.</p>
          </div>
          {activeTab !== 'upload' && <button className="btn-primary" onClick={() => setActiveTab('upload')} style={{ padding: '9px 18px', fontSize: '0.82rem' }}><PlusCircle size={15} /> New Project</button>}
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'portfolio' && (
            <motion.div key="portfolio" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
              {projects.length > 0 ? projects.map(p => <ProjectCard key={p.id} project={p} />) : <EmptyState icon={<PlusCircle size={36} />} title="No projects yet" desc="Upload your first project to start building your portfolio." />}
            </motion.div>
          )}
          {activeTab === 'upload' && (
            <motion.div key="upload" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="glass-card-static" style={{ padding: '40px', maxWidth: '700px', margin: '0 auto' }}>
              <ProjectForm onSuccess={() => { setActiveTab('portfolio'); fetchProjects(); }} />
            </motion.div>
          )}
          {activeTab === 'feedback' && (
            <motion.div key="feedback" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {projects.filter(p => p.adminFeedback).length > 0 ? projects.filter(p => p.adminFeedback).map(p => <FeedbackCard key={p.id} project={p} />) : <EmptyState icon={<MessageSquare size={36} />} title="No feedback yet" desc="Once faculty reviews your work, feedback will appear here." />}
            </motion.div>
          )}
          {['certs', 'resume', 'network', 'skills'].includes(activeTab) && (
            <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '80px' }}>
              <div style={{ padding: '28px', background: 'var(--surface)', borderRadius: 'var(--radius-2xl)', display: 'inline-block', marginBottom: '20px' }}><Zap size={40} color="var(--primary)" /></div>
              <h3 style={{ fontSize: '1.2rem' }}>Coming Soon</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '0.9rem' }}>This feature is under active development.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

/* Sub-Components */
const NavLabel = ({ children, style }) => <p style={{ fontSize: '0.62rem', color: 'var(--text-dim)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.2px', margin: '12px 0 6px 10px', ...style }}>{children}</p>;

const NavItem = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '11px 14px', borderRadius: 'var(--radius-md)', width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer', background: active ? 'rgba(124,92,252,0.1)' : 'transparent', color: active ? 'var(--primary-light)' : 'var(--text-muted)', fontWeight: active ? '600' : '500', fontSize: '0.84rem', borderLeft: active ? '3px solid var(--primary)' : '3px solid transparent', transition: 'all 0.15s' }}>
    {icon} {label}
  </button>
);

const EmptyState = ({ icon, title, desc }) => (
  <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px 0' }}>
    <div style={{ background: 'var(--surface)', display: 'inline-flex', padding: '24px', borderRadius: '50%', marginBottom: '20px', color: 'var(--text-dim)' }}>{icon}</div>
    <h4 style={{ fontSize: '1.15rem' }}>{title}</h4>
    <p style={{ color: 'var(--text-muted)', marginTop: '6px', fontSize: '0.88rem' }}>{desc}</p>
  </div>
);

const ProjectCard = ({ project }) => (
  <div className="glass-card" style={{ overflow: 'hidden', height: '100%' }}>
    <div style={{ height: '200px', width: '100%', position: 'relative', overflow: 'hidden' }}>
      <img src={project.mediaUrl || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} onMouseEnter={e => e.target.style.transform = 'scale(1.05)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
      <div style={{ position: 'absolute', top: '14px', right: '14px' }}>
        <span className={`badge ${project.status === 'REVIEWED' ? 'badge-success' : 'badge-warning'}`}>{project.status}</span>
      </div>
    </div>
    <div style={{ padding: '24px' }}>
      <h3 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>{project.title}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px', lineHeight: '1.6' }}>{project.description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Star size={16} fill={project.rating > 0 ? "var(--secondary)" : "none"} color="var(--secondary)" />
          <span style={{ fontWeight: '700', fontSize: '1rem' }}>{project.rating || '—'}</span>
        </div>
        <button className="btn-ghost" style={{ fontSize: '0.82rem', color: 'var(--primary-light)' }}>Details <ExternalLink size={14} /></button>
      </div>
    </div>
  </div>
);

const FeedbackCard = ({ project }) => (
  <div className="glass-card-static" style={{ padding: '28px', borderLeft: '4px solid var(--primary)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
      <h4 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Review: {project.title}</h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Star size={16} fill="var(--secondary)" color="var(--secondary)" />
        <span style={{ fontWeight: '800', color: 'var(--secondary)', fontSize: '0.95rem' }}>{project.rating}/5.0</span>
      </div>
    </div>
    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', marginBottom: '16px' }}>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.8', fontStyle: 'italic' }}>"{project.adminFeedback}"</p>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--surface-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Trophy size={18} color="var(--primary-light)" /></div>
      <div><p style={{ fontSize: '0.82rem', fontWeight: '600' }}>Faculty Review Board</p><p style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Verified Assessment</p></div>
    </div>
  </div>
);

const ProjectForm = ({ onSuccess }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ title: '', description: '', mediaUrl: '' });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/projects`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, status: 'PENDING', student: { id: user?.id || 1 }, milestones: ["Project Initiated"] }) });
      if (res.ok) onSuccess();
    } catch (err) { alert("Submission simulated (Backend not reached)"); onSuccess(); }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: '28px', fontSize: '1.6rem' }} className="gradient-text">Project Details</h2>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem' }}>Project Title</label>
        <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem' }}>Description</label>
        <textarea required rows="5" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', fontFamily: 'inherit' }} />
      </div>
      <div style={{ marginBottom: '28px' }}>
        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem' }}>Media Cover URL</label>
        <input type="text" value={formData.mediaUrl} onChange={e => setFormData({...formData, mediaUrl: e.target.value})} placeholder="https://..." style={{ width: '100%' }} />
      </div>
      <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.95rem' }}>Publish to Portfolio</button>
    </form>
  );
};

export default StudentDashboard;
