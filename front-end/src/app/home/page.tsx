'use client'
import {useRouter} from 'next/navigation';
import {useEffect} from "react";

export const dynamic = 'force-dynamic';
export default function Home() {
    const router = useRouter();
    useEffect(() => {
        router.refresh();
    }, [])
    return (
        <>
            <h1>User's Home Page</h1>
        </>
    );
}