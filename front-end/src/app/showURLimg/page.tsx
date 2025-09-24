'use client';

import { useSearchParams } from "next/navigation";
import QRCode from 'qrcode';
import {useState, useEffect} from 'react';

export default function ShowURLimg() {
   const [qrCodeUrl, setURL] = useState("");
    const totp_uri = useSearchParams().get("totp_uri") || "";
    const manual = useSearchParams().get("manual") || "";
    console.log("totp_uri param: ", totp_uri);
    console.log("manual param: ", manual);
    
    const encoded = encodeURIComponent(totp_uri);
    useEffect(() => {
        if(totp_uri){
            QRCode.toDataURL(encoded, {
            width: 200,
            margin: 2,
        })
        .then(url => setURL(url))
        .catch(err => console.error(err));
        }
    }, [totp_uri])
       
    return (
        <div>
            <h1>QR Code</h1>
            {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code for MFA setup" />}
            <h1>Manual Entry Key</h1>
            <p>{manual}</p>
        </div>
    );
}