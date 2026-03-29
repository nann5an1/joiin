'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLogout } from '@/hooks/useAuth';

export default function LogOutPage() {
    const router = useRouter();
    // useLogout gives us a mutate function — we call it to trigger the logout API call
    const { mutate: logout } = useLogout();

    useEffect(() => {
        logout(undefined, {
            onSuccess: () => router.push('/'),
            onError: (err) => console.error('Logout error', err),
        });
    }, []);

    return <div></div>;
}
