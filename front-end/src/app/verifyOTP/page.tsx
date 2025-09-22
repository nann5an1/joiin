'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useSearchParams } from "next/navigation";

export default function verifyOTPToken(){
    const user_id = useSearchParams().get("user_id");
    const router = useRouter();
    const [token, setToken] = useState("");
    
    // Handle OTP value change - InputOTP handles the individual digits
    function handleOTPChange(value: string) {
        setToken(value);
    }
    
    async function verifyMFA(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        
        if (!token || token.length !== 6) {
            console.log("Please enter a complete 6-digit code");
            return;
        }
        
        try {
            // Fixed: Added query parameter or path parameter properly
            const data = await fetch(`http://localhost:3000/api/v0.1/user/verifyMFA?token=${token}&user_id=${user_id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            
            if(data.ok){
                console.log("MFA verification passed");
                const result = await data.json();
                
                // Fixed: Better response handling
                if(result.success === true || result.success === 1) {
                    router.push("/");
                } else {
                    console.log("Wrong token code for verification.");
                    // Consider showing error message to user
                }
            } else {
                console.log("Failed to verify MFA token");
            }
        } catch (error) {
            console.error("Error in verifying MFA", error);
        }
    }
    
    return(
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <div className="text-center space-y-6">
                <h2 className="text-xl font-semibold">Enter the code from your authenticator app</h2>
                
                <div className="flex justify-center">
                    <InputOTP 
                        maxLength={6} 
                        value={token}
                        onChange={handleOTPChange}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                
                <div className="flex justify-center items-center mt-8">
                    <button 
                        type="submit" 
                        onClick={verifyMFA}
                        className="px-6 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={token.length !== 6}
                    >
                        Verify Code
                    </button>
                </div>
            </div>
        </div>
    )
}