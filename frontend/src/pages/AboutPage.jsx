import React from 'react';
import { motion } from 'framer-motion';
import { Database, Code2, Server, Globe, Cpu, Zap, Layers, GraduationCap, ShieldCheck, Briefcase, ArrowRight, GitBranch, Lock, BarChart3, CheckCircle2, Monitor, BookOpen } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const fadeUp = { hidden: { opacity: 0, y: 25 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }) };

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh' }}>
      <Navbar />

      {/* HERO */}
      <section style={{ padding: '140px 40px 80px', textAlign: 'center', position: 'relative' }}>
        <div className="glow-orb glow-orb-primary" style={{ width: '500px', height: '500px', top: '-15%', left: '20%' }} />
        <motion.div initial="hidden" animate="visible" style={{ position: 'relative', zIndex: 1 }}>
          <motion.span variants={fadeUp} custom={0} className="badge badge-primary" style={{ marginBottom: '20px' }}>About This Project</motion.span>
          <motion.h1 variants={fadeUp} custom={1} style={{ fontSize: 'clamp(2.4rem,5vw,3.8rem)', marginBottom: '20px', maxWidth: '800px', margin: '0 auto 20px' }}>
            How <span className="gradient-text">PortfolioHub</span> Works
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto', lineHeight: '1.8' }}>
            A comprehensive full-stack web application for managing student portfolios with faculty evaluation, built using modern industry-standard technologies.
          </motion.p>
        </motion.div>
      </section>

      {/* ARCHITECTURE OVERVIEW */}
      <section style={{ padding: '80px 40px' }}>
        <div className="section-container">
          <SectionHeader badge="Architecture" title="System Architecture" subtitle="PortfolioHub follows a modern three-tier architecture separating concerns into Frontend, Backend, and Database layers." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '24px', marginTop: '48px' }}>
            <ArchCard icon={<Monitor size={28} />} color="var(--primary)" title="Frontend (Client)" subtitle="React + Vite" items={['Built with React 18 and Vite for fast development', 'Component-based UI with JSX', 'Framer Motion for smooth animations', 'Lucide React for premium icon system', 'React Router v6 for client-side routing', 'Context API for global auth state management', 'Responsive glassmorphism design system']} />
            <ArchCard icon={<Server size={28} />} color="var(--accent)" title="Backend (Server)" subtitle="Java Spring Boot" items={['Spring Boot 3.x REST API server', 'Spring MVC controller layer', 'Service layer for business logic', 'Spring Data JPA for database access', 'Spring Security (CSRF disabled for dev)', 'CORS configured for frontend origin', 'Auto-initialized sample data on startup']} />
            <ArchCard icon={<Database size={28} />} color="var(--secondary)" title="Database" subtitle="H2 In-Memory" items={['H2 embedded relational database', 'JPA/Hibernate ORM for object mapping', 'Auto-creates tables from @Entity models', 'Two core tables: Users and Projects', 'ManyToOne relationship (Student → Projects)', 'ElementCollection for milestone tracking', 'H2 Console at /h2-console for inspection']} />
          </div>
        </div>
      </section>

      {/* DATA FLOW */}
      <section style={{ padding: '80px 40px', background: 'rgba(255,255,255,0.01)' }}>
        <div className="section-container">
          <SectionHeader badge="Data Flow" title="How Data Moves" subtitle="Understanding the request-response cycle from user action to database and back." />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginTop: '48px', maxWidth: '900px', margin: '48px auto 0' }}>
            {[
              { step: '1', title: 'User Interacts with React UI', desc: 'Student clicks "Upload Project" or Admin clicks "Assess" — React captures the event and prepares a fetch() request.', color: 'var(--primary)' },
              { step: '2', title: 'REST API Call to Spring Boot', desc: 'Frontend sends HTTP request (GET/POST) to endpoints like /api/projects or /api/auth/login on port 8080.', color: 'var(--cyan)' },
              { step: '3', title: 'Controller → Service → Repository', desc: 'Spring MVC routes the request through Controller → Service layer (business logic) → JPA Repository (database query).', color: 'var(--accent)' },
              { step: '4', title: 'H2 Database Processes Query', desc: 'JPA/Hibernate translates Java objects to SQL, executes against H2 in-memory database, and returns entity results.', color: 'var(--secondary)' },
              { step: '5', title: 'JSON Response to Frontend', desc: 'Spring Boot serializes the Java objects to JSON and sends the response back. React updates state and re-renders the UI.', color: 'var(--rose)' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ display: 'flex', gap: '24px', padding: '28px 0', borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: '44px', height: '44px', background: `${item.color}15`, border: `2px solid ${item.color}40`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: item.color, fontSize: '0.85rem', flexShrink: 0 }}>{item.step}</div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '6px', color: item.color }}>{item.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DATABASE SCHEMA */}
      <section style={{ padding: '80px 40px' }}>
        <div className="section-container">
          <SectionHeader badge="Database" title="Database Schema" subtitle="H2 in-memory relational database with JPA entity mapping." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(380px,1fr))', gap: '24px', marginTop: '48px' }}>
            <SchemaCard table="users" color="var(--primary)" fields={[{ name: 'id', type: 'BIGINT (PK)', desc: 'Auto-generated identity' }, { name: 'email', type: 'VARCHAR', desc: 'Login credential' }, { name: 'password', type: 'VARCHAR', desc: 'Plain text (dev mode)' }, { name: 'firstName', type: 'VARCHAR', desc: 'User first name' }, { name: 'lastName', type: 'VARCHAR', desc: 'User last name' }, { name: 'role', type: 'VARCHAR', desc: 'STUDENT or ADMIN' }]} />
            <SchemaCard table="project" color="var(--accent)" fields={[{ name: 'id', type: 'BIGINT (PK)', desc: 'Auto-generated identity' }, { name: 'title', type: 'VARCHAR', desc: 'Project name' }, { name: 'description', type: 'VARCHAR(2000)', desc: 'Detailed description' }, { name: 'mediaUrl', type: 'VARCHAR', desc: 'Cover image URL' }, { name: 'status', type: 'VARCHAR', desc: 'PENDING / REVIEWED' }, { name: 'rating', type: 'DOUBLE', desc: 'Faculty score (1-5)' }, { name: 'adminFeedback', type: 'VARCHAR(2000)', desc: 'Review comments' }, { name: 'student_id', type: 'BIGINT (FK)', desc: 'References users.id' }]} />
          </div>
        </div>
      </section>

      {/* API ENDPOINTS */}
      <section style={{ padding: '80px 40px', background: 'rgba(255,255,255,0.01)' }}>
        <div className="section-container">
          <SectionHeader badge="REST API" title="API Endpoints" subtitle="All backend communication happens via these RESTful endpoints on port 8080." />
          <div className="glass-card-static" style={{ marginTop: '48px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
                  {['Method', 'Endpoint', 'Description'].map(h => (
                    <th key={h} style={{ padding: '14px 24px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '1px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { method: 'POST', endpoint: '/api/auth/signup', desc: 'Register a new student or admin account', color: 'var(--accent)' },
                  { method: 'POST', endpoint: '/api/auth/login', desc: 'Authenticate and return user data', color: 'var(--accent)' },
                  { method: 'GET', endpoint: '/api/projects', desc: 'Fetch all projects (admin view)', color: 'var(--primary)' },
                  { method: 'POST', endpoint: '/api/projects', desc: 'Create a new project submission', color: 'var(--accent)' },
                  { method: 'GET', endpoint: '/api/projects/student/{id}', desc: 'Fetch projects for a specific student', color: 'var(--primary)' },
                  { method: 'POST', endpoint: '/api/projects/{id}/review', desc: 'Submit rating and feedback for a project', color: 'var(--accent)' },
                ].map((api, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }} className="table-row">
                    <td style={{ padding: '14px 24px' }}><span style={{ fontFamily: 'monospace', fontWeight: '700', fontSize: '0.8rem', color: api.color, background: `${api.color}12`, padding: '3px 8px', borderRadius: '6px' }}>{api.method}</span></td>
                    <td style={{ padding: '14px 24px', fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{api.endpoint}</td>
                    <td style={{ padding: '14px 24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{api.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* USER ROLES */}
      <section style={{ padding: '80px 40px' }}>
        <div className="section-container">
          <SectionHeader badge="User Roles" title="How It Helps Each User" subtitle="PortfolioHub provides a tailored experience for students, teachers, and the public." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '24px', marginTop: '48px' }}>
            <HelpCard icon={<GraduationCap size={28} />} color="var(--primary)" title="For Students" items={['Create a professional digital portfolio with real projects', 'Upload project details including title, description, and media', 'Track project status (Pending → Reviewed)', 'Receive faculty ratings (1-5 scale) and written feedback', 'View all feedback in a dedicated section', 'Build credibility through verified institutional endorsement', 'Future: Resume builder, skill analytics, peer networking']} />
            <HelpCard icon={<ShieldCheck size={28} />} color="var(--accent)" title="For Teachers / Admins" items={['Access a central dashboard of all student submissions', 'Search and filter through the student project registry', 'Open detailed assessment modals for each project', 'Assign technical proficiency scores (1-5)', 'Write professional feedback published to students', 'Track reviewed vs pending submission status', 'Future: Analytics dashboard, batch export, faculty management']} />
            <HelpCard icon={<Briefcase size={28} />} color="var(--secondary)" title="For Recruiters & Public" items={['Browse verified, faculty-endorsed student portfolios', 'Trust ratings backed by institutional review', 'Discover talent filtered by project quality', 'View real project work with descriptions and media', 'Connect with students showing professional potential', 'Future: Public showcase page with search and filtering']} />
          </div>
        </div>
      </section>

      {/* PROJECT STRUCTURE */}
      <section style={{ padding: '80px 40px', background: 'rgba(255,255,255,0.01)' }}>
        <div className="section-container">
          <SectionHeader badge="Codebase" title="Project Structure" subtitle="Clean separation between frontend and backend codebases." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(380px,1fr))', gap: '24px', marginTop: '48px' }}>
            <CodeStructure title="Frontend (React + Vite)" color="var(--primary)" items={['src/App.jsx — Route definitions & protected routes', 'src/index.css — Global design system & tokens', 'src/pages/LandingPage.jsx — Public landing page', 'src/pages/LoginPage.jsx — Authentication form', 'src/pages/SignupPage.jsx — Registration form', 'src/pages/StudentDashboard.jsx — Student workspace', 'src/pages/AdminDashboard.jsx — Faculty review panel', 'src/pages/AboutPage.jsx — Project documentation', 'src/components/Navbar.jsx — Global navigation', 'src/components/Captcha.jsx — Security verification', 'src/context/AuthContext.jsx — Auth state management']} />
            <CodeStructure title="Backend (Spring Boot)" color="var(--accent)" items={['model/User.java — User entity (JPA @Entity)', 'model/Project.java — Project entity with relations', 'repository/UserRepository.java — JPA data access', 'repository/ProjectRepository.java — Project queries', 'service/AuthService.java — Login & registration logic', 'service/ProjectService.java — CRUD & review logic', 'controller/UserController.java — Auth API endpoints', 'controller/ProjectController.java — Project endpoints', 'SecurityConfig.java — Spring Security config', 'DataInitializer.java — Seed data on startup', 'application.properties — H2 DB & server config']} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 40px' }}>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass-card-static" style={{ maxWidth: '800px', margin: '0 auto', padding: '60px', textAlign: 'center', background: 'linear-gradient(135deg,rgba(124,92,252,0.08),rgba(6,214,160,0.06))', border: '1px solid rgba(124,92,252,0.15)' }}>
          <h2 style={{ fontSize: '2.4rem', marginBottom: '16px' }}>Ready to explore?</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '32px' }}>Create an account and start building your portfolio today.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/signup')} className="btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }}>Get Started <ArrowRight size={18} /></button>
            <button onClick={() => navigate('/')} className="btn-secondary" style={{ padding: '14px 32px', fontSize: '1rem' }}>Back to Home</button>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '40px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>© 2026 PortfolioHub — Built with React, Spring Boot & H2 Database</p>
      </footer>
    </div>
  );
};

/* Sub-components */
const SectionHeader = ({ badge, title, subtitle }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center' }}>
    <span className="badge badge-primary" style={{ marginBottom: '16px' }}>{badge}</span>
    <h2 style={{ fontSize: '2.4rem', marginBottom: '12px' }}>{title}</h2>
    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7' }}>{subtitle}</p>
  </motion.div>
);

const ArchCard = ({ icon, color, title, subtitle, items }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: '36px 28px' }}>
    <div style={{ width: '52px', height: '52px', background: `${color}15`, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color }}>{icon}</div>
    <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{title}</h3>
    <p style={{ color, fontSize: '0.82rem', fontWeight: '700', marginBottom: '20px' }}>{subtitle}</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {items.map((item, i) => (<div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><CheckCircle2 size={14} color={color} style={{ marginTop: '4px', flexShrink: 0 }} /><span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>{item}</span></div>))}
    </div>
  </motion.div>
);

const SchemaCard = ({ table, color, fields }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card-static" style={{ overflow: 'hidden' }}>
    <div style={{ padding: '20px 24px', background: `${color}10`, borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Database size={18} color={color} /><h4 style={{ fontSize: '1rem', color }}>{table}</h4>
    </div>
    <div style={{ padding: '4px 0' }}>
      {fields.map((f, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '10px 24px', borderBottom: i < fields.length - 1 ? '1px solid var(--border)' : 'none', gap: '12px' }}>
          <code style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--text-main)', fontWeight: '600', minWidth: '100px' }}>{f.name}</code>
          <span style={{ fontSize: '0.72rem', color, fontWeight: '700', background: `${color}10`, padding: '2px 8px', borderRadius: '4px' }}>{f.type}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginLeft: 'auto' }}>{f.desc}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

const HelpCard = ({ icon, color, title, items }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: '36px 28px' }}>
    <div style={{ width: '52px', height: '52px', background: `${color}15`, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color }}>{icon}</div>
    <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', color }}>{title}</h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {items.map((item, i) => (<div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><CheckCircle2 size={14} color={color} style={{ marginTop: '4px', flexShrink: 0 }} /><span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>{item}</span></div>))}
    </div>
  </motion.div>
);

const CodeStructure = ({ title, color, items }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card-static" style={{ overflow: 'hidden' }}>
    <div style={{ padding: '20px 24px', background: `${color}10`, borderBottom: '1px solid var(--border)' }}>
      <h4 style={{ fontSize: '1rem', color }}>{title}</h4>
    </div>
    <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem', marginTop: '2px' }}>📄</span>
          <code style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{item}</code>
        </div>
      ))}
    </div>
  </motion.div>
);

export default AboutPage;
