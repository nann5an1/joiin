'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLogin } from '@/hooks/useAuth';
import { useIsEnabledMFA } from '@/hooks/useMFA';

export default function LoginPage() {
    const router = useRouter();
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => { router.prefetch('/'); }, [router]);

    const { mutate: login, isPending } = useLogin();

    const { data: mfaData, refetch: checkMFA } = useIsEnabledMFA();

    useEffect(() => {
        if (mfaData == null || userId == null) return;
        const mfaEnabled = mfaData?.data?.mfaEnabled;
        if (mfaEnabled) router.push('/verifyOTP?user_id=' + userId);
        else router.push('/');
    }, [mfaData, userId]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        login(loginInfo, {
            onSuccess: (data) => {
                setUserId(data.user.id);
                checkMFA();
            },
            onError: (err) => console.error('Login error', err),
        });
    }

    return (
        <div className="login-page-bg min-h-screen flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">

                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Welcome back to{' '}
                        <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text">
                            Joiin
                        </span>
                    </h1>
                    <p className="text-slate-500 mt-2 text-sm">Sign in to discover sports events near you</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
                    <form className="space-y-5" onSubmit={handleSubmit}>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block mb-1.5 text-sm font-medium text-slate-700">
                                Email
                            </label>
                            <div className="flex items-center px-4 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-300 focus-within:bg-white transition-colors">
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    value={loginInfo.email}
                                    onChange={handleChange}
                                    placeholder="name@company.com"
                                    required
                                    className="w-full bg-transparent border-none focus:outline-none py-3 text-slate-700 placeholder:text-slate-400 text-sm"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block mb-1.5 text-sm font-medium text-slate-700">
                                Password
                            </label>
                            <div className="flex items-center px-4 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-300 focus-within:bg-white transition-colors">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={loginInfo.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-transparent border-none focus:outline-none py-3 text-slate-700 placeholder:text-slate-400 text-sm"
                                />
                            </div>
                        </div>

                        {/* Remember / Forgot */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="w-4 h-4 border border-slate-300 rounded accent-cyan-500"
                                />
                                <label htmlFor="remember" className="text-sm text-slate-500">Remember me</label>
                            </div>
                            <a href="#" className="text-sm font-medium text-cyan-600 hover:text-blue-600 hover:underline transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full login-page-bg hover:from-cyan-600 hover:to-blue-600 text-gray-800 font-semibold rounded-xl py-3 text-sm shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isPending ? 'Signing in...' : 'Sign in'}
                        </button>

                        <p className="text-sm text-center text-slate-500">
                            Don&apos;t have an account?{' '}
                            <Link href="/sign_up" className="font-medium text-cyan-600 hover:text-blue-600 hover:underline transition-colors">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
