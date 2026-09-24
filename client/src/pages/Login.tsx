import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight } from 'react-icons/fa6';

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPw, setShowPw] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className='h-svh max-h-svh overflow-hidden bg-(--white) flex max-w-360 mx-auto'>
            {/* Left - form */}
            <div className="flex flex-col w-full md:w-1/2 md:px-20 px-8 xs:px-12 sm:px-30 justify-center">
                <h2 className='text-4xl font-bold mb-2'>Welcome.</h2>
                <p className='text-md pb-8'>Access your surveillance system.</p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

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
                            <a href="#" className='text-xs text-[#6b6b6b] hover:brightness-70'>Forgot password?</a>
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

                    <button type="submit" className='flex items-center justify-center gap-2 bg-[#1c1c1c] text-(--white) text-sm font-medium p-3.5 rounded-2xl border-none my-2 hover:bg-[#1c1c1c]/90 transition-all'>
                        Login
                        <FaArrowRight className='text-xs' />
                    </button>
                </form>
                <div className='mt-6 pt-6 border-t border-[#e4e4e4] text-center'>
                    <p className='m-0 text-sm text-[#6b6b6b]'>
                        Don't have an account?{' '}
                        <Link to="/signup" className='text-[#1c1c1c] font-bold hover:underline! hover:underline-offset-2 transition-all'>Signup</Link>
                    </p>
                </div>
            </div>

            {/* Right section */}
            <aside className='w-1/2 bg-(--white) md:flex hidden py-6 pr-6 items-center h-full'>
                <img
                    src="https://images.unsplash.com/photo-1618482914248-29272d021005?w=900&h=1200&fit=crop&auto=format"
                    alt="Surveillance"
                    className='rounded-2xl h-full w-full object-cover max-h-200'
                    loading='lazy'
                />
            </aside>
        </div>
    );
}
