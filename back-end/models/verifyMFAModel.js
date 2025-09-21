import pool from "../database/db.js";
import speakeasy from "speakeasy";

export async function verifyMFAModel(user_id, usertoken){
    const sql_cmd = `SELECT mfa_secret from user WHERE id = ?`;
    const [result] = await pool.execute(sql_cmd, [user_id]); 
    const base32secret = result[0].mfa_secret;

    // Use verify() to check the token against the secret
    const verified = speakeasy.totp.verify({ secret: base32secret,
                                            encoding: 'base32',
                                            token: usertoken });
    return verified;
}