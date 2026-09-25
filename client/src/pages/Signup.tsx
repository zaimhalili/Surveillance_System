import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

export default function Signup() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ nome: '', email: '', password: '' });
    const [showPw, setShowPw] = useState(false);
    const [agree, setAgree] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    const strength = (() => {
        const p = form.password;
        if (!p.length) return 0;
        let s = 0;
        if (p.length >= 8) s++;
        if (/[A-Z]/.test(p)) s++;
        if (/[0-9]/.test(p)) s++;
        if (/[^A-Za-z0-9]/.test(p)) s++;
        return s;
    })();

    const strengthInfo = [
        { label: '', color: '#e4e4e4' },
        { label: 'Debole', color: '#ef4444' },
        { label: 'Discreta', color: '#f59e0b' },
        { label: 'Buona', color: '#3b82f6' },
        { label: 'Ottima', color: '#16a34a' },
    ][strength];

    return (
        <div style={{ minHeight: '100vh', display: 'flex', background: '#fff' }}>

            {/* Left - dark image */}
            <div style={{ width: '46%', position: 'relative', background: '#111', overflow: 'hidden', flexShrink: 0 }}>
                <img
                    src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=900&h=1200&fit=crop&auto=format"
                    alt="Sorveglianza"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '48px' }}>
                    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', width: 'fit-content' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="fa-solid fa-video" style={{ color: '#1c1c1c', fontSize: '12px' }} />
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff', fontFamily: "'Fira Sans', sans-serif" }}>Smart Surveillance</span>
                    </Link>

                    <div>
                        <p style={{ margin: '0 0 20px', fontSize: '11px', fontFamily: "'Fira Code', monospace", color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                            Gratis, per sempre
                        </p>
                        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {[
                                'Fino a 2 telecamere gratuite',
                                'Rilevamento persone AI',
                                'Notifiche push istantanee',
                                'Archivio sicuro 7 giorni',
                            ].map((item) => (
                                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <i className="fa-solid fa-check" style={{ color: '#4ade80', fontSize: '12px' }} />
                                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', fontFamily: "'Fira Sans', sans-serif" }}>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Right - form */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '40px 48px' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '100%', maxWidth: '360px' }}>
                        <h1 style={{ margin: '0 0 8px', fontSize: '30px', fontWeight: 600, color: '#1c1c1c', letterSpacing: '-0.8px', fontFamily: "'Fira Sans', sans-serif" }}>Crea il tuo account.</h1>
                        <p style={{ margin: '0 0 36px', fontSize: '14px', color: '#6b6b6b', fontFamily: "'Fira Sans', sans-serif" }}>Inizia a monitorare la tua casa gratuitamente.</p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                            {/* Nome */}
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#1c1c1c', marginBottom: '8px', fontFamily: "'Fira Sans', sans-serif" }}>Nome completo</label>
                                <div style={{ position: 'relative' }}>
                                    <i className="fa-solid fa-user" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#bdbdbd', fontSize: '13px', pointerEvents: 'none' }} />
                                    <input
                                        type="text" required
                                        value={form.nome}
                                        onChange={(e) => setForm({ ...form, nome: e.target.value })}
                                        placeholder="John Pork"
                                        style={{ width: '100%', background: '#f6f6f6', border: '1px solid #e4e4e4', borderRadius: '14px', padding: '12px 14px 12px 40px', fontSize: '14px', color: '#1c1c1c', outline: 'none', boxSizing: 'border-box', fontFamily: "'Fira Sans', sans-serif" }}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#1c1c1c', marginBottom: '8px', fontFamily: "'Fira Sans', sans-serif" }}>Email</label>
                                <div style={{ position: 'relative' }}>
                                    <i className="fa-solid fa-envelope" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#bdbdbd', fontSize: '13px', pointerEvents: 'none' }} />
                                    <input
                                        type="email" required
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        placeholder="nome@esempio.it"
                                        style={{ width: '100%', background: '#f6f6f6', border: '1px solid #e4e4e4', borderRadius: '14px', padding: '12px 14px 12px 40px', fontSize: '14px', color: '#1c1c1c', outline: 'none', boxSizing: 'border-box', fontFamily: "'Fira Sans', sans-serif" }}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#1c1c1c', marginBottom: '8px', fontFamily: "'Fira Sans', sans-serif" }}>Password</label>
                                <div style={{ position: 'relative' }}>
                                    <i className="fa-solid fa-lock" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#bdbdbd', fontSize: '13px', pointerEvents: 'none' }} />
                                    <input
                                        type={showPw ? 'text' : 'password'} required
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        placeholder="Minimo 8 caratteri"
                                        style={{ width: '100%', background: '#f6f6f6', border: '1px solid #e4e4e4', borderRadius: '14px', padding: '12px 42px 12px 40px', fontSize: '14px', color: '#1c1c1c', outline: 'none', boxSizing: 'border-box', fontFamily: "'Fira Sans', sans-serif" }}
                                    />
                                    <button type="button" onClick={() => setShowPw(!showPw)}
                                        style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#bdbdbd', padding: 0 }}>
                                        <i className={`fa-solid ${showPw ? 'fa-eye-slash' : 'fa-eye'}`} style={{ fontSize: '13px' }} />
                                    </button>
                                </div>
                                {form.password.length > 0 && (
                                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ flex: 1, height: '3px', background: '#e4e4e4', borderRadius: '2px', overflow: 'hidden' }}>
                                            <div style={{ width: `${strength * 25}%`, height: '100%', background: strengthInfo.color, borderRadius: '2px', transition: 'all 0.3s' }} />
                                        </div>
                                        <span style={{ fontSize: '11px', color: strengthInfo.color, fontFamily: "'Fira Code', monospace", width: '48px' }}>{strengthInfo.label}</span>
                                    </div>
                                )}
                            </div>

                            {/* Checkbox */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', paddingTop: '4px' }}>
                                <button type="button" onClick={() => setAgree(!agree)}
                                    style={{ width: '20px', height: '20px', borderRadius: '8px', border: `1px solid ${agree ? '#1c1c1c' : '#e4e4e4'}`, background: agree ? '#1c1c1c' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, marginTop: '1px', padding: 0 }}>
                                    {agree && <i className="fa-solid fa-check" style={{ color: '#fff', fontSize: '9px' }} />}
                                </button>
                                <p style={{ margin: 0, fontSize: '12px', color: '#6b6b6b', lineHeight: 1.5, fontFamily: "'Fira Sans', sans-serif" }}>
                                    Accetto i{' '}
                                    <a href="#" style={{ color: '#1c1c1c', textDecoration: 'underline' }}>Termini di servizio</a>
                                    {' '}e la{' '}
                                    <a href="#" style={{ color: '#1c1c1c', textDecoration: 'underline' }}>Privacy Policy</a>
                                </p>
                            </div>

                            <button type="submit" disabled={!agree}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: agree ? '#1c1c1c' : '#d4d4d4', color: '#fff', fontSize: '14px', fontWeight: 500, padding: '14px', borderRadius: '14px', border: 'none', cursor: agree ? 'pointer' : 'not-allowed', fontFamily: "'Fira Sans', sans-serif", marginTop: '4px' }}>
                                Crea account
                                <i className="fa-solid fa-arrow-right" style={{ fontSize: '11px' }} />
                            </button>
                        </form>

                        <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e4e4e4', textAlign: 'center' }}>
                            <p style={{ margin: 0, fontSize: '13px', color: '#6b6b6b', fontFamily: "'Fira Sans', sans-serif" }}>
                                Hai già un account?{' '}
                                <Link to="/accedi" style={{ color: '#1c1c1c', fontWeight: 600, textDecoration: 'none' }}>Accedi</Link>
                            </p>
                        </div>
                    </div>
                </div>

                <p style={{ margin: '40px 0 0', fontSize: '12px', color: '#bdbdbd', fontFamily: "'Fira Code', monospace", textAlign: 'center' }}>
                    © 2026 Smart Surveillance System
                </p>
            </div>
        </div>
    );
}
