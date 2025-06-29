'use client';
import  { useRouter } from 'next/navigation';

export default function LogOutPage(){
    async function logout(){
        const router = useRouter();
        try {
            const result =await fetch("http://localhost:3000/api/v0.1/user/logout", 
                {method: 'POST',
                credentials: 'include',
                });
            if (result.ok)
            {
                console.log("Successful logout");
                router.push("/");
            }
        } catch (error) {
            console.error("Logout error", error);
        }
    return (
        <div>
        </div>
    )};
}
