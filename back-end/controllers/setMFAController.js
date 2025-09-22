//generate secret and verify TOTO in this file
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import {setMFAModel} from '../models/setMFAModel.js'

//set up the MFA authentication
export async function setMFAController(req, res){
    try{
    const secret = speakeasy.generateSecret({length: 20, type: 'base32'}); //generate the secret key(use to generate the url of the QR code)

    //use the secret key to generate the one-time passcode
    const TOTP_code = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32',
    });

    const url = await qrcode.toDataURL(secret.otpauth_url);
    if(!url) console.error("Error generating QR code");

    console.log("Url: ", url);
    console.log("Secret: ", secret);
    console.log("TOTP code: ", TOTP_code);

    await setMFAModel(req.user.id, secret.base32); //parse the secret key to encrypt and save and add into the db
    res.status(200).json({
        success: true,
        qrCode: url,                    // ✅ Frontend displays this
        manualEntryKey: secret.base32,        // ✅ User can manually enter this
        message: 'Scan QR code with your authenticator app'
        });
    } catch (error) {
        res.status(500).json(error);
    }
}
