'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSignUp } from "@/hooks/useAuth";

const FEATURES = [
    '14-day free trial, no credit card required',
    'Unlimited events and participants',
    'Real-time notifications and updates',
    'Advanced analytics and reporting',
    '24/7 customer support',
];

export default function SignUpPage() {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState({ name: '', email: '', password: '' });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [emailExist, setEmailExist] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const { mutate: signUp, isPending } = useSignUp();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setEmailExist(false);
        setPasswordMismatch(false);

        if (userInfo.password !== confirmPassword) {
            setPasswordMismatch(true);
            return;
        }

        signUp(userInfo, {
            onSuccess: (data) => {
                if (data.success === true) router.push('/login');
                else setEmailExist(true);
            },
            onError: (err) => console.error('Sign up error', err),
        });
    }

    return (
        <div className="login-page-bg min-h-screen flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-12 items-center">

                {/* ── Left: Marketing copy ── */}
                <div className="space-y-6">
                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                        Start Managing{' '}
                        <span className="text-blue-500">
                            Sports Events
                        </span>
                    </h1>

                    <p className="text-slate-500 text-base max-w-md">
                        Join thousands of coordinators who trust Joiin to manage their events efficiently.
                    </p>

                    {/* Feature list */}
                    <ul className="space-y-3">
                        {FEATURES.map(f => (
                            <li key={f} className="flex items-center gap-3 text-slate-700 text-sm">
                                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
                                    <Check className="h-3.5 w-3.5 text-blue-500" strokeWidth={3} />
                                </span>
                                {f}
                            </li>
                        ))}
                    </ul>

                    {/* Social proof */}
                    <div className="flex items-center gap-3 pt-2">
                        <p className="text-sm text-slate-500">
                            <span className="font-bold text-slate-900">50,000+</span> event coordinators already use Joiin
                        </p>
                    </div>
                </div>

                {/* ── Right: Form card ── */}
                <div className="w-full lg:w-[420px] bg-white rounded-2xl shadow-lg border border-slate-100 p-8 space-y-5">
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create your account</h2>
                        <p className="text-slate-500 text-sm mt-1">Get started with your free trial</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Full Name */}
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-slate-700">
                                Full Name
                            </label>
                            <div className="flex items-center px-4 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-300 focus-within:bg-white transition-colors">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-transparent border-none focus:outline-none py-3 text-slate-700 placeholder:text-slate-400 text-sm"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-700">
                                Email
                            </label>
                            <div className="flex items-center px-4 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-300 focus-within:bg-white transition-colors">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-transparent border-none focus:outline-none py-3 text-slate-700 placeholder:text-slate-400 text-sm"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-700">
                                Password
                            </label>
                            <div className="flex items-center px-4 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-300 focus-within:bg-white transition-colors">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create a strong password"
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-transparent border-none focus:outline-none py-3 text-slate-700 placeholder:text-slate-400 text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(v => !v)}
                                    className="text-slate-400 hover:text-slate-600 shrink-0"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">Must be at least 8 characters</p>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-slate-700">
                                Confirm Password
                            </label>
                            <div className={`flex items-center px-4 bg-slate-50 rounded-xl border focus-within:bg-white transition-colors ${
                                passwordMismatch ? 'border-red-400 focus-within:border-red-400' : 'border-slate-200 focus-within:border-blue-300'
                            }`}>
                                <input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type={showConfirm ? 'text' : 'password'}
                                    placeholder="Re-enter your password"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full bg-transparent border-none focus:outline-none py-3 text-slate-700 placeholder:text-slate-400 text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(v => !v)}
                                    className="text-slate-400 hover:text-slate-600 shrink-0"
                                >
                                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {passwordMismatch && (
                                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                            )}
                        </div>

                        {/* Terms checkbox */}
                        <div className="flex items-start gap-3 pt-1">
                            <input
                                id="terms"
                                type="checkbox"
                                checked={agreed}
                                onChange={e => setAgreed(e.target.checked)}
                                required
                                className="mt-0.5 w-4 h-4 rounded border-slate-300 accent-cyan-500"
                            />
                            <label htmlFor="terms" className="text-sm text-slate-500">
                                I agree to the{' '}
                                <a href="#" className="font-medium text-cyan-600 hover:text-blue-600 hover:underline transition-colors">Terms of Service</a>
                                {' '}and{' '}
                                <a href="#" className="font-medium text-cyan-600 hover:text-blue-600 hover:underline transition-colors">Privacy Policy</a>
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isPending || !agreed}
                            className="w-full login-page-bg hover:from-cyan-600 hover:to-blue-600 text-gray-800 font-semibold rounded-xl py-3 text-sm shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isPending ? 'Creating account...' : 'Register'}
                        </button>

                        <p className="text-sm text-center text-slate-500">
                            Already have an account?{' '}
                            <Link href="/login" className="font-medium text-cyan-600 hover:text-blue-600 hover:underline transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </form>

                    {emailExist && (
                        <Alert variant="destructive">
                            <AlertTitle>Email already exists</AlertTitle>
                            <AlertDescription>Please use a different email for your registration.</AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
}
