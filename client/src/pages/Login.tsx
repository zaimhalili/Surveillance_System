import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPw, setShowPw] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', background: '#fff' }}>

            {/* Left — form */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '40px 48px' }}>
                <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: 'auto' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#1c1c1c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="fa-solid fa-video" style={{ color: '#fff', fontSize: '12px' }} />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#1c1c1c', fontFamily: "'Fira Sans', sans-serif" }}>Smart Surveillance</span>
                </Link>

                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '100%', maxWidth: '360px' }}>
                        <h1 style={{ margin: '0 0 8px', fontSize: '30px', fontWeight: 600, color: '#1c1c1c', letterSpacing: '-0.8px', fontFamily: "'Fira Sans', sans-serif" }}>Bentornato.</h1>
                        <p style={{ margin: '0 0 36px', fontSize: '14px', color: '#6b6b6b', fontFamily: "'Fira Sans', sans-serif" }}>Accedi al tuo sistema di sorveglianza.</p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

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
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 500, color: '#1c1c1c', fontFamily: "'Fira Sans', sans-serif" }}>Password</label>
                                    <a href="#" style={{ fontSize: '12px', color: '#6b6b6b', textDecoration: 'none', fontFamily: "'Fira Sans', sans-serif" }}>Password dimenticata?</a>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <i className="fa-solid fa-lock" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#bdbdbd', fontSize: '13px', pointerEvents: 'none' }} />
                                    <input
                                        type={showPw ? 'text' : 'password'} required
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        placeholder="••••••••"
                                        style={{ width: '100%', background: '#f6f6f6', border: '1px solid #e4e4e4', borderRadius: '14px', padding: '12px 42px 12px 40px', fontSize: '14px', color: '#1c1c1c', outline: 'none', boxSizing: 'border-box', fontFamily: "'Fira Sans', sans-serif" }}
                                    />
                                    <button type="button" onClick={() => setShowPw(!showPw)}
                                        style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#bdbdbd', padding: 0 }}>
                                        <i className={`fa-solid ${showPw ? 'fa-eye-slash' : 'fa-eye'}`} style={{ fontSize: '13px' }} />
                                    </button>
                                </div>
                            </div>

                            <button type="submit"
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#1c1c1c', color: '#fff', fontSize: '14px', fontWeight: 500, padding: '14px', borderRadius: '14px', border: 'none', cursor: 'pointer', fontFamily: "'Fira Sans', sans-serif', marginTop: '8px'" }}>
                                Accedi
                                <i className="fa-solid fa-arrow-right" style={{ fontSize: '11px' }} />
                            </button>
                        </form>

                        <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e4e4e4', textAlign: 'center' }}>
                            <p style={{ margin: 0, fontSize: '13px', color: '#6b6b6b', fontFamily: "'Fira Sans', sans-serif" }}>
                                Non hai un account?{' '}
                                <Link to="/registrati" style={{ color: '#1c1c1c', fontWeight: 600, textDecoration: 'none' }}>Registrati</Link>
                            </p>
                        </div>
                    </div>
                </div>

                <p style={{ margin: '40px 0 0', fontSize: '12px', color: '#bdbdbd', fontFamily: "'Fira Code', monospace" }}>
                    © 2026 Smart Surveillance System
                </p>
            </div>

            {/* Right — dark image panel */}
            <div style={{ width: '46%', position: 'relative', background: '#111', overflow: 'hidden', flexShrink: 0 }}>
                <img
                    src="https://images.unsplash.com/photo-1618482914248-29272d021005?w=900&h=1200&fit=crop&auto=format"
                    alt="Sorveglianza"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '48px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', padding: '7px 14px', marginBottom: '20px', backdropFilter: 'blur(4px)', width: 'fit-content' }}>
                        <span className="rec-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} />
                        <span style={{ color: '#fff', fontSize: '12px', fontFamily: "'Fira Code', monospace" }}>6 telecamere attive</span>
                    </div>
                    <blockquote style={{ margin: '0 0 28px', fontSize: '26px', fontWeight: 600, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.5px', fontFamily: "'Fira Sans', sans-serif" }}>
                        "Sorveglianza intelligente,<br />semplicità assoluta."
                    </blockquote>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="fa-solid fa-user" style={{ color: '#fff', fontSize: '13px' }} />
                        </div>
                        <div>
                            <p style={{ margin: 0, fontSize: '14px', fontWeight: 500, color: '#fff', fontFamily: "'Fira Sans', sans-serif" }}>Marco Rossi</p>
                            <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontFamily: "'Fira Code', monospace" }}>Cliente dal 2024</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
