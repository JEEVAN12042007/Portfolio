import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Layers, LogIn, UserPlus, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinkStyle = (path) => ({
    color: isActive(path) ? 'var(--primary-light)' : 'var(--text-muted)',
    fontSize: '0.88rem',
    fontWeight: isActive(path) ? '600' : '500',
    textDecoration: 'none',
    padding: '6px 12px',
    borderRadius: 'var(--radius-sm)',
    transition: 'all 0.2s ease',
    position: 'relative',
  });

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '68px',
      background: scrolled ? 'rgba(6, 7, 10, 0.88)' : 'rgba(6, 7, 10, 0.5)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      zIndex: 1000,
      transition: 'all 0.3s ease',
    }}>
      {/* Logo */}
      <div
        onClick={() => navigate('/')}
        style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
      >
        <div style={{
          width: '36px',
          height: '36px',
          background: 'linear-gradient(135deg, var(--primary), var(--accent))',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 12px rgba(124, 92, 252, 0.3)',
        }}>
          <Layers size={18} color="white" strokeWidth={2.5} />
        </div>
        <span style={{
          fontSize: '1.2rem',
          fontWeight: '800',
          fontFamily: "'Space Grotesk', sans-serif",
          letterSpacing: '-0.02em',
        }} className="gradient-text">
          PortfolioHub
        </span>
      </div>

      {/* Center Nav Links */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(255,255,255,0.03)',
        padding: '4px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
      }}>
        <Link to="/" style={navLinkStyle('/')}>Home</Link>
        <Link to="/about" style={navLinkStyle('/about')}>About</Link>
        <Link to="/showcase" style={navLinkStyle('/showcase')}>Showcase</Link>
      </div>

      {/* Right Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {user ? (
          <>
            <button
              onClick={() => navigate(user.role === 'ADMIN' ? '/admin' : '/student')}
              className="btn-primary"
              style={{ padding: '8px 18px', fontSize: '0.82rem' }}
            >
              Dashboard
            </button>
            <button
              onClick={logout}
              className="btn-ghost"
              style={{ padding: '8px 14px', fontSize: '0.82rem' }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <LogIn size={15} /> Sign In
              </button>
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.82rem' }}>
                <UserPlus size={15} /> Get Started
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
