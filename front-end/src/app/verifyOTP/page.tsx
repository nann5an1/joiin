'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useVerifyMFA } from "@/hooks/useMFA";

export default function VerifyOTPPage() {
    const user_id = useSearchParams().get("user_id") ?? undefined;
    const router = useRouter();
    const [token, setToken] = useState("");

    // useMutation — we call mutate() when the user clicks Verify
    const { mutate: verifyMFA, isPending } = useVerifyMFA();

    function handleOTPChange(value: string) {
        setToken(value);
    }

    function handleVerify(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!token || token.length !== 6) return;

        // Pass token + user_id as a single object — matches the hook's expected shape
        verifyMFA({ token, user_id }, {
            onSuccess: (result) => {
                if (result.success === true || result.success === 1) router.push('/');
                else console.log('Wrong token code for verification.');
            },
            onError: (err) => console.error('Error in verifying MFA', err),
        });
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <div className="text-center space-y-6">
                <h2 className="text-xl font-semibold">Enter the code from your authenticator app</h2>
                <div className="flex justify-center">
                    <InputOTP maxLength={6} value={token} onChange={handleOTPChange}>
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
                        onClick={handleVerify}
                        className="px-6 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={token.length !== 6 || isPending}
                    >
                        {isPending ? 'Verifying...' : 'Verify Code'}
                    </button>
                </div>
            </div>
        </div>
    );
}
