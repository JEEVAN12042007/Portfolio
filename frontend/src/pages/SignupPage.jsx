import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, ShieldCheck, ArrowLeft, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const API_BASE = "http://localhost:8080/api";

const SignupPage = () => {
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/auth/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, role: role.toUpperCase() }) });
      if (res.ok) { alert('Account created successfully! Please login.'); navigate('/login'); }
    } catch (err) { alert('Error connecting to backend. Please check if the server is running.'); }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)', position: 'relative', overflow: 'hidden' }}>
      <div className="glow-orb glow-orb-primary" style={{ width: '400px', height: '400px', top: '5%', right: '10%' }} />
      <div className="glow-orb glow-orb-accent" style={{ width: '350px', height: '350px', bottom: '5%', left: '10%', opacity: 0.08 }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="glass-card" style={{ width: '100%', maxWidth: '500px', padding: '48px', zIndex: 1 }}>
        <button onClick={() => navigate('/login')} className="btn-ghost" style={{ marginBottom: '28px', fontSize: '0.88rem' }}>
          <ArrowLeft size={16} /> Back to Login
        </button>

        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(124,92,252,0.1)', borderRadius: '14px', marginBottom: '20px', border: '1px solid rgba(124,92,252,0.15)' }}>
            <Layers size={24} color="var(--primary-light)" />
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '10px', letterSpacing: '-0.5px' }} className="gradient-text">Create Account</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Join the next generation of academic excellence.</p>
        </div>

        {/* Role Toggle */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-lg)', padding: '5px', marginBottom: '32px', border: '1px solid var(--border)' }}>
          <button onClick={() => setRole('student')} style={{ flex: 1, padding: '11px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '700', fontSize: '0.85rem', border: 'none', cursor: 'pointer', background: role === 'student' ? 'var(--primary)' : 'transparent', color: role === 'student' ? 'white' : 'var(--text-muted)', transition: 'all 0.2s' }}>
            <User size={16} /> Student
          </button>
          <button onClick={() => setRole('admin')} style={{ flex: 1, padding: '11px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '700', fontSize: '0.85rem', border: 'none', cursor: 'pointer', background: role === 'admin' ? 'var(--secondary)' : 'transparent', color: role === 'admin' ? 'var(--background)' : 'var(--text-muted)', transition: 'all 0.2s' }}>
            <ShieldCheck size={16} /> Admin
          </button>
        </div>

        <form onSubmit={handleSignup}>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: '600' }}>First Name</label>
              <input type="text" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} style={{ width: '100%' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: '600' }}>Last Name</label>
              <input type="text" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} style={{ width: '100%' }} />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: '600' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} size={16} color="var(--text-dim)" />
              <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="name@university.edu" style={{ width: '100%', padding: '11px 11px 11px 40px' }} />
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: '600' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} size={16} color="var(--text-dim)" />
              <input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder="••••••••" style={{ width: '100%', padding: '11px 11px 11px 40px' }} />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '0.95rem' }}>
            <UserPlus size={18} /> Create {role === 'admin' ? 'Admin' : 'Student'} Account
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Already have an account? <a href="/login" style={{ color: 'var(--primary-light)', fontWeight: '700', textDecoration: 'none' }}>Sign In</a>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
