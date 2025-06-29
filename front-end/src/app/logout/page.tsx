'use client'
import  { useRouter } from 'next/router';
const router = useRouter();

export default async function logout(){
    try {
        const result =await fetch("http://localhost:3000/api/v0.1/user/logout", 
            {method: 'POST',
            credentials: 'include',
            });
        if (result.ok)
            router.push("/");
    } catch (error) {
        console.error("Logout error", error);
    }
    return (
        <div>
        </div>
    )
}