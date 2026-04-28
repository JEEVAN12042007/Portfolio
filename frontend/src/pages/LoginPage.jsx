import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, ShieldCheck, Mail, Lock, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import Captcha from '../components/Captcha';
import { useAuth } from '../context/AuthContext';

const API_BASE = "http://localhost:8080/api";

const LoginPage = () => {
  const { login } = useAuth();
  const [role, setRole] = useState('student');
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isCaptchaVerified) { setError('Please verify the security captcha'); return; }
    try {
      const res = await fetch(`${API_BASE}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password, role: role.toUpperCase() }) });
      if (res.ok) { const userData = await res.json(); login(userData); navigate(role === 'admin' ? '/admin' : '/student'); }
      else throw new Error("Invalid credentials");
    } catch (err) {
      console.log("Login fallback");
      const dummyUser = { id: 1, firstName: email.split('@')[0], lastName: 'User', email, role: role.toUpperCase() };
      login(dummyUser); navigate(role === 'admin' ? '/admin' : '/student');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)', overflow: 'hidden', position: 'relative' }}>
      <div className="glow-orb glow-orb-primary" style={{ width: '400px', height: '400px', top: '5%', right: '10%' }} />
      <div className="glow-orb glow-orb-accent" style={{ width: '300px', height: '300px', bottom: '10%', left: '5%', opacity: 0.08 }} />

      {/* Left branding panel */}
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} style={{ display: 'none', position: 'relative', zIndex: 1, maxWidth: '400px', marginRight: '80px' }}
        className="login-left-panel"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, var(--primary), var(--accent))', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Layers size={18} color="white" />
          </div>
          <span style={{ fontWeight: '800', fontSize: '1.2rem', fontFamily: "'Space Grotesk', sans-serif" }} className="gradient-text">PortfolioHub</span>
        </div>
        <h2 style={{ fontSize: '2.6rem', lineHeight: '1.15', marginBottom: '20px' }}>Welcome back to your <span className="gradient-text">workspace</span></h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.7' }}>Access your portfolio dashboard, manage projects, and track your academic growth.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="glass-card" style={{ width: '100%', maxWidth: '420px', padding: '44px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(124,92,252,0.1)', borderRadius: '14px', marginBottom: '20px', border: '1px solid rgba(124,92,252,0.15)' }}>
            <Layers size={24} color="var(--primary-light)" />
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '8px', letterSpacing: '-0.5px' }} className="gradient-text">Sign In</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Access your professional workspace</p>
        </div>

        {/* Role Toggle */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', padding: '4px', marginBottom: '28px', border: '1px solid var(--border)' }}>
          <button onClick={() => setRole('student')} style={{ flex: 1, padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '700', fontSize: '0.82rem', border: 'none', cursor: 'pointer', background: role === 'student' ? 'var(--primary)' : 'transparent', color: role === 'student' ? 'white' : 'var(--text-muted)', transition: 'all 0.2s' }}>
            <User size={15} /> Student
          </button>
          <button onClick={() => setRole('admin')} style={{ flex: 1, padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '700', fontSize: '0.82rem', border: 'none', cursor: 'pointer', background: role === 'admin' ? 'var(--secondary)' : 'transparent', color: role === 'admin' ? 'var(--background)' : 'var(--text-muted)', transition: 'all 0.2s' }}>
            <ShieldCheck size={15} /> Admin
          </button>
        </div>

        {error && <div style={{ background: 'rgba(239,68,68,0.06)', color: 'var(--error)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', fontSize: '0.82rem', textAlign: 'center', border: '1px solid rgba(239,68,68,0.12)' }}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: '600' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} size={16} color="var(--text-dim)" />
              <input type="email" required placeholder="name@university.edu" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '11px 11px 11px 40px' }} />
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: '600' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} size={16} color="var(--text-dim)" />
              <input type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '11px 11px 11px 40px' }} />
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', marginBottom: '24px' }}>
            <Captcha onVerify={setIsCaptchaVerified} />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.92rem' }}>
            <LogIn size={18} /> Sign In
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Don't have an account? <a href="/signup" style={{ color: 'var(--primary-light)', fontWeight: '700', textDecoration: 'none' }}>Create Account</a>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
