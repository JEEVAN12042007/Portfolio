import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, ShieldCheck, Star, ArrowRight, Zap, Trophy, Briefcase, Layers, Database, Code2, Monitor, GraduationCap, Users, BookOpen, CheckCircle2, Server, Globe, Cpu, GitBranch } from 'lucide-react';
import Navbar from '../components/Navbar';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } }) };

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh' }}>
      <Navbar />
      {/* HERO */}
      <section style={{ padding: '160px 40px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="glow-orb glow-orb-primary" style={{ width: '500px', height: '500px', top: '-10%', left: '-5%' }} />
        <div className="glow-orb glow-orb-accent" style={{ width: '400px', height: '400px', top: '10%', right: '-5%' }} />
        <motion.div initial="hidden" animate="visible" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div variants={fadeUp} custom={0} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(124,92,252,0.1)', borderRadius: '100px', color: 'var(--primary-light)', fontSize: '0.82rem', fontWeight: '700', marginBottom: '28px', border: '1px solid rgba(124,92,252,0.2)' }}>
            <Zap size={13} /> Academic Portfolio Platform
          </motion.div>
          <motion.h1 variants={fadeUp} custom={1} style={{ fontSize: 'clamp(2.8rem,6vw,5rem)', lineHeight: '1.05', marginBottom: '24px', maxWidth: '900px', margin: '0 auto 24px' }}>
            Build Your Academic<br /><span className="gradient-text">Digital Identity</span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} style={{ color: 'var(--text-muted)', fontSize: 'clamp(1rem,2vw,1.2rem)', maxWidth: '640px', margin: '0 auto 48px', lineHeight: '1.7' }}>
            A full-stack platform where students showcase projects, teachers evaluate work, and institutions track academic excellence — powered by React & Spring Boot.
          </motion.p>
          <motion.div variants={fadeUp} custom={3} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/signup')} className="btn-primary" style={{ padding: '14px 32px', fontSize: '1rem', borderRadius: 'var(--radius-lg)' }}>Start Building <ArrowRight size={18} /></button>
            <button onClick={() => navigate('/about')} className="btn-secondary" style={{ padding: '14px 32px', fontSize: '1rem', borderRadius: 'var(--radius-lg)' }}>How It Works</button>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ display: 'flex', justifyContent: 'center', gap: '60px', marginTop: '100px', flexWrap: 'wrap' }}>
          {[{ count: '10k+', label: 'Active Students', icon: <GraduationCap size={18} /> }, { count: '50k+', label: 'Projects Hosted', icon: <GitBranch size={18} /> }, { count: '200+', label: 'Institutions', icon: <Globe size={18} /> }].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--primary-light)' }}>{s.icon}</span>
                <h3 style={{ fontSize: '2.2rem', fontWeight: '800' }}>{s.count}</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem' }}>{s.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* TECH STRIP */}
      <section style={{ padding: '60px 40px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="section-container">
          <p style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '32px' }}>Built With Modern Technologies</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap', alignItems: 'center' }}>
            {[{ name: 'React', icon: <Code2 size={22} /> }, { name: 'Spring Boot', icon: <Server size={22} /> }, { name: 'H2 Database', icon: <Database size={22} /> }, { name: 'REST API', icon: <Globe size={22} /> }, { name: 'JPA/Hibernate', icon: <Cpu size={22} /> }, { name: 'Vite', icon: <Zap size={22} /> }].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)' }}>
                {t.icon}<span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '120px 40px' }}>
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '72px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '16px' }}>Features</span>
            <h2 style={{ fontSize: '2.8rem', marginBottom: '16px' }}>Why <span className="gradient-text">PortfolioHub</span>?</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto' }}>Designed for academic excellence with powerful tools for every stakeholder.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '24px' }}>
            <FeatureCard icon={<Rocket color="var(--primary-light)" size={24} />} bg="rgba(124,92,252,0.1)" title="Instant Project Showcase" desc="Upload projects with rich descriptions, media, and tags. Build a portfolio in minutes." />
            <FeatureCard icon={<ShieldCheck color="var(--accent)" size={24} />} bg="rgba(6,214,160,0.1)" title="Faculty Verification" desc="Admins review, rate, and provide feedback with a structured evaluation system." />
            <FeatureCard icon={<Trophy color="var(--secondary)" size={24} />} bg="rgba(245,158,11,0.1)" title="Skill Analytics" desc="Automated competency tracking maps your growth based on project history and reviews." />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '100px 40px', background: 'rgba(255,255,255,0.01)' }}>
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '72px' }}>
            <span className="badge badge-success" style={{ marginBottom: '16px' }}>How It Works</span>
            <h2 style={{ fontSize: '2.8rem', marginBottom: '16px' }}>Three Simple Steps</h2>
            <p style={{ color: 'var(--text-muted)' }}>From signup to showcase in under 5 minutes.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '32px', maxWidth: '1000px', margin: '0 auto' }}>
            {[{ step: '01', title: 'Create Account', desc: 'Register as a Student or Admin with your institutional email.', icon: <Users size={28} />, color: 'var(--primary)' }, { step: '02', title: 'Upload Projects', desc: 'Add your best work with descriptions, images, and milestones.', icon: <BookOpen size={28} />, color: 'var(--accent)' }, { step: '03', title: 'Get Reviewed', desc: 'Faculty members evaluate, rate, and provide professional feedback.', icon: <Star size={28} />, color: 'var(--secondary)' }].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="glass-card" style={{ padding: '40px 32px', textAlign: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', width: '32px', height: '32px', background: item.color, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '800', color: 'white', boxShadow: `0 4px 16px ${item.color}44` }}>{item.step}</div>
                <div style={{ color: item.color, marginBottom: '20px', marginTop: '8px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.92rem' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section style={{ padding: '120px 40px' }}>
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '72px' }}>
            <span className="badge badge-warning" style={{ marginBottom: '16px' }}>Stakeholders</span>
            <h2 style={{ fontSize: '2.8rem', marginBottom: '16px' }}>Built For <span className="gradient-text-warm">Everyone</span></h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '24px' }}>
            <RoleCard icon={<GraduationCap size={32} />} color="var(--primary)" title="Students" benefits={['Build a professional digital portfolio', 'Upload unlimited projects with media', 'Receive verified faculty feedback', 'Track skill growth over time', 'Share portfolio with recruiters']} />
            <RoleCard icon={<ShieldCheck size={32} />} color="var(--accent)" title="Teachers & Admins" benefits={['Review and rate student submissions', 'Provide structured professional feedback', 'Monitor academic performance trends', 'Access full student registry', 'Export assessment reports']} />
            <RoleCard icon={<Briefcase size={32} />} color="var(--secondary)" title="Recruiters & Public" benefits={['Browse verified student portfolios', 'Filter by skills and ratings', 'View faculty-endorsed projects', 'Contact promising candidates', 'Trust institutional validation']} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 40px' }}>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass-card-static" style={{ maxWidth: '960px', margin: '0 auto', padding: '72px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg,rgba(124,92,252,0.08),rgba(6,214,160,0.06))', border: '1px solid rgba(124,92,252,0.15)' }}>
          <h2 style={{ fontSize: '2.8rem', marginBottom: '16px' }}>Ready to showcase your work?</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px' }}>Join thousands of students building their academic digital identity.</p>
          <button onClick={() => navigate('/signup')} className="btn-primary" style={{ margin: '0 auto', padding: '16px 40px', fontSize: '1.05rem', borderRadius: 'var(--radius-lg)' }}>Create Free Account <ArrowRight size={18} /></button>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '60px 40px 40px', borderTop: '1px solid var(--border)' }}>
        <div className="section-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px', marginBottom: '40px' }}>
            <div style={{ maxWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg,var(--primary),var(--accent))', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Layers size={16} color="white" /></div>
                <span style={{ fontWeight: '800', fontSize: '1.1rem', fontFamily: "'Space Grotesk',sans-serif" }} className="gradient-text">PortfolioHub</span>
              </div>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', lineHeight: '1.7' }}>The modern platform for academic portfolio management and professional growth.</p>
            </div>
            <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
              {[{ t: 'Platform', l: ['Home', 'Features', 'About', 'Showcase'] }, { t: 'Tech Stack', l: ['React + Vite', 'Spring Boot', 'H2 Database', 'REST API'] }, { t: 'Users', l: ['Students', 'Teachers', 'Admins', 'Recruiters'] }].map((col, i) => (
                <div key={i}><h4 style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>{col.t}</h4><div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>{col.l.map((link, j) => <span key={j} style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>{link}</span>)}</div></div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>© 2026 PortfolioHub. All rights reserved.</p>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Built with React • Spring Boot • H2</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, bg, title, desc }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: '40px 32px' }}>
    <div style={{ width: '52px', height: '52px', background: bg, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>{icon}</div>
    <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>{title}</h3>
    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '0.92rem' }}>{desc}</p>
  </motion.div>
);

const RoleCard = ({ icon, color, title, benefits }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: '40px 32px' }}>
    <div style={{ width: '56px', height: '56px', background: `${color}18`, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', color }}>{icon}</div>
    <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', color }}>{title}</h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {benefits.map((b, i) => (<div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}><CheckCircle2 size={16} color={color} style={{ marginTop: '3px', flexShrink: 0 }} /><span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>{b}</span></div>))}
    </div>
  </motion.div>
);

export default LandingPage;
