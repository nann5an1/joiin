'use client';
import { useSearchParams } from "next/navigation";

export default function ShowURLimg() {
   
    const param = useSearchParams().get("urlQR") || "";
    const manual = useSearchParams().get("manual") || "";
    console.log("url param: ", param);
    console.log("manual param: ", manual);
    return (
        <div>
            <h1>QR Code</h1>
            <img src={param} alt="" />
            <h1>Manual Entry Key</h1>
            <p>{manual}</p>
        </div>
    );
}