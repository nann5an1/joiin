
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useState } from "react";
import { useRouter } from "next/navigation";

export function verifyOTPToken(){
     const router = useRouter();
     const [token, setDigit] = useState("");

     function setDigitOnChange(digit: string) {
        setDigit(digit);
    }

    async function verifyMFA(e: React.MouseEvent<HTMLButtonElement>) {
      try {
        const data = await fetch(`http://localhost:3000/api/v0.1/user/verifyMFA${token}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // ✅ important: include cookies so will include the user id
        });
      if(data.ok){
        console.log("MFA verification passed", data);
        const result = await data.json();
        if(result[0].verified == 1) router.push("/");
        else console.log("Wrong token code for verification.");
      }
      } catch (error) {
        console.error("Error in verifying MFA", error);
      }
    }
    return(
        <>
        <InputOTP maxLength={6}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} /><input type="text" onChange={(e) => setDigitOnChange(e.target.value)} />
                    <InputOTPSlot index={1} /><input type="text" onChange={(e) => setDigitOnChange(e.target.value)} />
                    <InputOTPSlot index={2} /><input type="text" onChange={(e) => setDigitOnChange(e.target.value)} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={3} /><input type="text" onChange={(e) => setDigitOnChange(e.target.value)} />
                    <InputOTPSlot index={4} /><input type="text" onChange={(e) => setDigitOnChange(e.target.value)} />
                    <InputOTPSlot index={5} /><input type="text" onChange={(e) => setDigitOnChange(e.target.value)} />
                </InputOTPGroup>
        </InputOTP>
        <button type="submit" onClick={verifyMFA}></button>
        </>
    )
}