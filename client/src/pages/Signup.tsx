import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaCheck } from 'react-icons/fa6';

export default function Signup() {
    const navigate = useNavigate();
    const [form, setForm] = useState<{
        name: string, email: string; password: string
    }>({
        name: '',
        email: '',
        password: ''
    });
    const [showPw, setShowPw] = useState<boolean>(false);
    const [agree, setAgree] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className='h-svh sm:max-h-svh sm:overflow-hidden bg-(--white) flex max-w-360 mx-auto'>
            {/* Left section */}
            <aside className='w-1/2 bg-(--white) md:flex hidden py-6 pl-6 items-center h-full'>
                <img
                    src="https://images.ctfassets.net/a3peezndovsu/zt0uzbM9jKrt57gBwg7nO/0a0d0d4290e6c8b16998d8da6f9ec69d/ring_security_camera_spotlight_cam_pro_4k_327x327_2x.jpg"
                    alt="Surveillance"
                    className='rounded-2xl h-full w-full object-cover max-h-200'
                    loading='lazy'
                />
            </aside>
            {/* Right - form */}
            <div className="flex flex-col w-full md:w-1/2 md:px-20 px-8 xs:px-12 sm:px-30 justify-center">
                <h2 className='text-4xl font-bold mb-2'>Create your account.</h2>
                <p className='text-md pb-8'>Start monitoring your house.</p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    {/* Name */}
                    <div>
                        <label className='text-xs flex pb-2 font-medium w-full'>Name</label>
                        <div className='relative'>
                            <FaEnvelope className='absolute left-3.5 top-1/2 -translate-y-1/2 text-[#bdbdbd] text-md pointer-events-none' />
                            <input
                                type="text" required
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="John"
                                className='w-full bg-[#f6f6f6] border border-[#e4e4e4] rounded-2xl py-3 pr-3.5 pl-10 text-sm text-(--black) focus:outline-(--black)'
                            />
                        </div>
                    </div>
                    {/* Email */}
                    <div>
                        <label className='text-xs flex pb-2 font-medium w-full'>Email</label>
                        <div className='relative'>
                            <FaEnvelope className='absolute left-3.5 top-1/2 -translate-y-1/2 text-[#bdbdbd] text-md pointer-events-none' />
                            <input
                                type="email" required
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                placeholder="johndoe@example.com"
                                className='w-full bg-[#f6f6f6] border border-[#e4e4e4] rounded-2xl py-3 pr-3.5 pl-10 text-sm text-(--black) focus:outline-(--black)'
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <div className='flex justify-between mb-2'>
                            <label className='text-xs font-medium'>Password</label>
                        </div>
                        <div className='relative'>
                            <FaLock className='absolute left-3.5 top-1/2 -translate-y-1/2 text-[#bdbdbd] text-md pointer-events-none' />
                            <input
                                type={showPw ? 'text' : 'password'} required
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                placeholder="••••••••"
                                className='w-full bg-[#f6f6f6] border border-[#e4e4e4] rounded-2xl py-3 pr-3.5 pl-10 text-sm text-(--black) focus:outline-(--black)'
                            />
                            <button type="button" onClick={() => setShowPw(!showPw)} className='absolute right-3.5 top-1/2 -translate-y-1/2 bg-none text-[#bdbdbd]'>
                                {showPw ? <FaEyeSlash className='text-sm' /> : <FaEye className='text-sm' />}
                            </button>
                        </div>
                    </div>
                    {/* Checkbox */}
                    <div className='flex gap-3 items-center'>
                        <button type="button" onClick={() => setAgree(!agree)} className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-px p-0 ${agree ? 'border-[#1c1c1c] bg-(--black)' : 'border-[#e4e4e4] bg-(--white)'} border`}>
                            {agree && <FaCheck className='text-(--white) text-xs font-bold' />}
                        </button>
                        <p className='m-0 text-xs text-[#6d6d6d] '>
                            Accetto i{' '}
                            <Link to={'/signup'} className='text-[#1c1c1c] hover:brightness-70! underline transition-all'>Termini di servizio</Link>
                            {' '}e la{' '}
                            <Link to={'/signup'} className='text-[#1c1c1c] hover:brightness-70! underline transition-all'>Privacy Policy</Link>
                        </p>
                    </div>

                    <button type="submit" className='flex items-center justify-center gap-2 bg-[#1c1c1c] text-(--white) text-sm font-medium p-3.5 rounded-2xl border-none my-2 hover:bg-[#1c1c1c]/90 transition-all'>
                        Signup
                        <FaArrowRight className='text-xs' />
                    </button>
                </form>
                <div className='mt-6 pt-6 border-t border-[#e4e4e4] text-center'>
                    <p className='m-0 text-sm text-[#6b6b6b]'>
                        Already have an account?{' '}
                        <Link to="/login" className='text-[#1c1c1c] font-bold hover:underline! hover:underline-offset-2 transition-all pb-20 xs:pb-10 sm:pb-0 inline'>Login</Link>
                    </p>
                </div>
            </div>


        </div>
    );
}
