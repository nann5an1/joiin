'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLogin } from '@/hooks/useAuth';
import { useIsEnabledMFA } from '@/hooks/useMFA';

export default function LoginPage() {
    const router = useRouter();
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    // We store user id so the MFA check effect can read it
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => { router.prefetch('/'); }, [router]);

    // useMutation — fires when we call login()
    const { mutate: login, isPending } = useLogin();

    // enabled: false means this query does NOT auto-run on page load.
    // We manually trigger it with refetch() after login succeeds.
    const { data: mfaData, refetch: checkMFA } = useIsEnabledMFA();

    // Once checkMFA() resolves, mfaData updates — this effect reacts to that
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
                checkMFA(); // trigger the MFA status check
            },
            onError: (err) => console.error('Login error', err),
        });
    }

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="text" name="email" id="email" value={loginInfo.email} onChange={handleChange} className="h-12 bg-gray-50 border border-gray-300 text-gray-900 rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="text" name="password" id="password" value={loginInfo.password} onChange={handleChange} placeholder="••••••••" className="h-12 -gray-50 border border-gray-300 text-gray-900 rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button type="submit" disabled={isPending} className="border-solid w-full text-gray-900 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                {isPending ? 'Signing in...' : 'Sign in'}
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account yet? <Link href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
