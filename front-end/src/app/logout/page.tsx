'use client';
import  { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LogOutPage(){
    const router = useRouter();
    useEffect(() => {
        async function logout(){
        try {
            const result =await fetch("http://localhost:3000/api/v0.1/user/logout", 
                {method: 'POST',
                credentials: 'include',
                });
            if (result.ok)
            {
                console.log("Successful logout");
                // router.refresh();
                router.push("/");
                
            }
        } catch (error) {
            console.error("Logout error", error);
        }
    };
        logout();
    }, []);

    
    return (
        <div>
        </div>
    )
}
