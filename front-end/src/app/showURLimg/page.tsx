'use client';
import { useSearchParams } from "next/navigation";
import QRCode from 'qrcode';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useVerifyMFA } from "@/hooks/useMFA";

export default function ShowURLimg() {
    const [qrCodeUrl, setURL] = useState("");
    const totp_uri = useSearchParams().get("totp_uri") || "";
    const manual = useSearchParams().get("manual") || "";
    const encoded = encodeURIComponent(totp_uri);

    useEffect(() => {
        if (totp_uri) {
            QRCode.toDataURL(encoded, { width: 200, margin: 2 })
                .then(url => setURL(url))
                .catch(err => console.error(err));
        }
    }, [totp_uri]);

    const router = useRouter();
    const [token, setToken] = useState("");

    // Same mutation as verifyOTP — no user_id needed here (MFA setup flow, not login flow)
    const { mutate: verifyMFA, isPending } = useVerifyMFA();

    function handleOTPChange(value: string) {
        setToken(value);
    }

    function handleVerify(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!token || token.length !== 6) return;

        verifyMFA({ token }, {
            onSuccess: (result) => {
                if (result.success === true || result.success === 1) router.push('/');
                else console.log('Wrong token code for verification.');
            },
            onError: (err) => console.error('Error in verifying MFA', err),
        });
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <h1>QR Code</h1>
            {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code for MFA setup" />}
            <h1>Manual Entry Key</h1>
            <p>{manual}</p>
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
