import React, { useState, useEffect } from 'react';
import { RefreshCw, ShieldCheck } from 'lucide-react';

const Captcha = ({ onVerify }) => {
  const [captchaCode, setCaptchaCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [verified, setVerified] = useState(false);

  const generateCaptcha = () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
    setCaptchaCode(code);
    setUserInput('');
    setVerified(false);
    onVerify(false);
  };

  useEffect(() => { generateCaptcha(); }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setUserInput(val);
    const isValid = val === captchaCode;
    setVerified(isValid);
    onVerify(isValid);
  };

  return (
    <div style={{ marginTop: '4px' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', marginBottom: '10px', color: 'var(--text-dim)', fontWeight: '600' }}>
        <ShieldCheck size={13} /> Security Verification
      </label>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(124,92,252,0.1), rgba(6,214,160,0.1))',
          padding: '10px 20px',
          borderRadius: 'var(--radius-sm)',
          fontWeight: 'bold',
          letterSpacing: '5px',
          userSelect: 'none',
          fontFamily: 'monospace',
          fontSize: '1.15rem',
          fontStyle: 'italic',
          color: 'var(--primary-light)',
          border: '1px dashed var(--border)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {captchaCode}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)',
            pointerEvents: 'none'
          }} />
        </div>
        <button
          type="button"
          onClick={generateCaptcha}
          style={{
            padding: '8px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border)',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
          }}
        >
          <RefreshCw size={15} color="var(--text-dim)" />
        </button>
        {verified && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent)', fontSize: '0.75rem', fontWeight: '700' }}>
            <ShieldCheck size={14} /> Verified
          </div>
        )}
      </div>
      <input
        type="text"
        placeholder="Enter code above"
        value={userInput}
        onChange={handleChange}
        style={{
          width: '100%',
          marginTop: '10px',
        }}
      />
    </div>
  );
};

export default Captcha;
